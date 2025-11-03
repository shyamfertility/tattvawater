import Razorpay from "razorpay";
import crypto from "crypto";
import { 
  PaymentProvider, 
  PaymentProviderConfig,
  CreateOrderOptions,
  VerifyPaymentOptions,
  PaymentOrderResult,
  PaymentVerificationResult
} from "./PaymentProvider";

export class RazorpayProvider extends PaymentProvider {
  private razorpay: Razorpay;
  
  constructor(config: PaymentProviderConfig) {
    super(config);
    this.razorpay = new Razorpay({
      key_id: config.apiKey,
      key_secret: config.apiSecret,
    });
  }
  
  get providerName(): string {
    return "razorpay";
  }
  
  async createOrder(options: CreateOrderOptions): Promise<PaymentOrderResult> {
    try {
      const order = await this.razorpay.orders.create({
        amount: Math.round(options.amount * 100),
        currency: options.currency,
        receipt: options.receipt,
        notes: options.notes,
      });
      
      return {
        id: order.id,
        amount: Number(order.amount) / 100,
        currency: order.currency,
        status: order.status,
        receipt: order.receipt,
      };
    } catch (error: any) {
      console.error("Razorpay create order error:", error);
      throw new Error(`Failed to create Razorpay order: ${error.message}`);
    }
  }
  
  async verifyPayment(options: VerifyPaymentOptions): Promise<PaymentVerificationResult> {
    try {
      const generatedSignature = crypto
        .createHmac("sha256", this.config.apiSecret)
        .update(`${options.orderId}|${options.paymentId}`)
        .digest("hex");
      
      const verified = generatedSignature === options.signature;
      
      return {
        verified,
        paymentId: verified ? options.paymentId : undefined,
        errorMessage: verified ? undefined : "Invalid payment signature",
      };
    } catch (error: any) {
      console.error("Razorpay verify payment error:", error);
      return {
        verified: false,
        errorMessage: error.message,
      };
    }
  }
  
  verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      const expectedSignature = crypto
        .createHmac("sha256", this.config.webhookSecret || this.config.apiSecret)
        .update(payload)
        .digest("hex");
      
      return expectedSignature === signature;
    } catch (error) {
      console.error("Razorpay webhook verification error:", error);
      return false;
    }
  }
  
  async getPaymentStatus(paymentId: string): Promise<{ status: string; method?: string }> {
    try {
      const payment = await this.razorpay.payments.fetch(paymentId);
      return {
        status: payment.status,
        method: payment.method,
      };
    } catch (error: any) {
      console.error("Razorpay get payment status error:", error);
      throw new Error(`Failed to fetch payment status: ${error.message}`);
    }
  }
}
