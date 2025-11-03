import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { PaymentService } from "./services/PaymentService";
import { insertOrderSchema, insertPaymentSchema, updateUserProfileSchema } from "@shared/schema";
import { z } from "zod";

const paymentService = new PaymentService({
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || "",
    keySecret: process.env.RAZORPAY_KEY_SECRET || "",
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/user/profile", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const profileData = updateUserProfileSchema.parse(req.body);
      const user = await storage.updateUserProfile(req.user.id, profileData);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      
      const products = category
        ? await storage.getProductsByCategory(category as string)
        : await storage.getAllProducts();
      
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProduct(req.params.id);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/orders/create", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const { items, currency = "INR", shippingAddress, billingAddress } = req.body;
      
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Items are required" });
      }
      
      let totalAmount = 0;
      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(404).json({ error: `Product ${item.productId} not found` });
        }
        totalAmount += parseFloat(product.price) * (item.quantity || 1);
      }
      
      const provider = paymentService.detectProviderForRegion(currency);
      
      const order = await storage.createOrder({
        userId: req.user.id,
        status: "pending",
        totalAmount: totalAmount.toString(),
        currency,
        shippingAddress,
        billingAddress,
        items,
        paymentProvider: provider,
        paymentStatus: "pending",
      });
      
      const paymentOrder = await paymentService
        .getProvider(provider)
        .createOrder({
          amount: totalAmount,
          currency,
          receipt: order.id,
          notes: {
            orderId: order.id,
            userId: req.user.id,
          },
        });
      
      const payment = await storage.createPayment({
        orderId: order.id,
        provider,
        providerOrderId: paymentOrder.id,
        amount: totalAmount.toString(),
        currency,
        status: "initiated",
      });
      
      res.json({
        order,
        payment: {
          id: payment.id,
          orderId: paymentOrder.id,
          amount: totalAmount,
          currency,
          provider,
        },
        razorpayKeyId: provider === "razorpay" ? process.env.RAZORPAY_KEY_ID : undefined,
      });
    } catch (error: any) {
      console.error("Create order error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/payments/verify", async (req: Request, res: Response) => {
    try {
      const { provider, orderId, paymentId, signature } = req.body;
      
      if (!provider || !orderId || !paymentId || !signature) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      const paymentProvider = paymentService.getProvider(provider);
      
      const verification = await paymentProvider.verifyPayment({
        orderId,
        paymentId,
        signature,
      });
      
      if (!verification.verified) {
        return res.status(400).json({ 
          error: "Payment verification failed",
          message: verification.errorMessage 
        });
      }
      
      const payment = await storage.getPaymentByProviderOrderId(orderId);
      
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      
      await storage.updatePaymentStatus(payment.id, "completed", {
        providerPaymentId: paymentId,
        verifiedAt: new Date().toISOString(),
      });
      
      await storage.updateOrderStatus(payment.orderId, "confirmed", "completed");
      
      res.json({ 
        success: true, 
        message: "Payment verified successfully",
        orderId: payment.orderId
      });
    } catch (error: any) {
      console.error("Verify payment error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/payments/webhook/:provider", async (req: Request, res: Response) => {
    try {
      const { provider } = req.params;
      const signature = req.headers["x-razorpay-signature"] || req.headers["stripe-signature"];
      
      if (!signature || typeof signature !== "string") {
        return res.status(400).json({ error: "Missing signature" });
      }
      
      const paymentProvider = paymentService.getProvider(provider as any);
      const rawBody = JSON.stringify(req.body);
      
      const isValid = paymentProvider.verifyWebhookSignature(rawBody, signature);
      
      if (!isValid) {
        return res.status(400).json({ error: "Invalid signature" });
      }
      
      if (provider === "razorpay") {
        const event = req.body;
        
        if (event.event === "payment.captured") {
          const paymentEntity = event.payload.payment.entity;
          const payment = await storage.getPaymentByProviderOrderId(paymentEntity.order_id);
          
          if (payment) {
            await storage.updatePaymentStatus(payment.id, "completed", {
              providerPaymentId: paymentEntity.id,
              method: paymentEntity.method,
              capturedAt: new Date().toISOString(),
            });
            
            await storage.updateOrderStatus(payment.orderId, "confirmed", "completed");
          }
        } else if (event.event === "payment.failed") {
          const paymentEntity = event.payload.payment.entity;
          const payment = await storage.getPaymentByProviderOrderId(paymentEntity.order_id);
          
          if (payment) {
            await storage.updatePaymentStatus(payment.id, "failed", {
              errorCode: paymentEntity.error_code,
              errorDescription: paymentEntity.error_description,
            });
            
            await storage.updateOrderStatus(payment.orderId, "failed", "failed");
          }
        }
      }
      
      res.json({ received: true });
    } catch (error: any) {
      console.error("Webhook error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/payments/:id/status", async (req: Request, res: Response) => {
    try {
      const payment = await storage.getPayment(req.params.id);
      
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      
      if (payment.providerPaymentId) {
        const paymentProvider = paymentService.getProvider(payment.provider as any);
        const status = await paymentProvider.getPaymentStatus(payment.providerPaymentId);
        
        if (status.status !== payment.status) {
          await storage.updatePaymentStatus(payment.id, status.status, {
            method: status.method,
          });
        }
        
        res.json({ ...payment, ...status });
      } else {
        res.json(payment);
      }
    } catch (error: any) {
      console.error("Get payment status error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/orders", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const orders = await storage.getOrdersByUser(req.user.id);
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const order = await storage.getOrder(req.params.id);
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      if (order.userId !== req.user.id) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const orderPayments = await storage.getPaymentsByOrder(order.id);
      
      res.json({ ...order, payments: orderPayments });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/hydration/log", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const { amount, note } = req.body;
      
      if (!amount || typeof amount !== "number") {
        return res.status(400).json({ error: "Amount is required" });
      }
      
      const log = await storage.createHydrationLog({
        userId: req.user.id,
        amount,
        note,
      });
      
      res.json(log);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/hydration/logs", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const logs = await storage.getHydrationLogsByUser(req.user.id, limit);
      
      res.json(logs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/hydration/today", async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const today = new Date();
      const totalIntake = await storage.getUserDailyIntake(req.user.id, today);
      
      const user = await storage.getUser(req.user.id);
      const dailyGoal = user?.dailyGoal || 3000;
      
      res.json({
        current: totalIntake,
        goal: dailyGoal,
        percentage: Math.round((totalIntake / dailyGoal) * 100),
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
