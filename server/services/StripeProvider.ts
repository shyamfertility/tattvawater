import Stripe from "stripe";
import { 
  PaymentProvider, 
  PaymentProviderConfig,
  CreateOrderOptions,
  VerifyPaymentOptions,
  PaymentOrderResult,
  PaymentVerificationResult
} from "./PaymentProvider";

export class StripeProvider extends PaymentProvider {
  private stripe: Stripe;
  
  constructor(config: PaymentProviderConfig) {
    super(config);
    this.stripe = new Stripe(config.apiSecret, {
      apiVersion: "2025-10-29.clover",
    });
  }
  
  get providerName(): string {
    return "stripe";
  }
  
  async createOrder(options: CreateOrderOptions): Promise<PaymentOrderResult> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(options.amount * 100),
        currency: options.currency.toLowerCase(),
        metadata: options.notes || {},
        description: options.receipt,
      });
      
      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        status: paymentIntent.status,
        receipt: options.receipt,
      };
    } catch (error: any) {
      console.error("Stripe create payment intent error:", error);
      throw new Error(`Failed to create Stripe payment intent: ${error.message}`);
    }
  }
  
  async verifyPayment(options: VerifyPaymentOptions): Promise<PaymentVerificationResult> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(options.paymentId);
      
      const verified = paymentIntent.status === "succeeded";
      
      return {
        verified,
        paymentId: verified ? paymentIntent.id : undefined,
        errorMessage: verified ? undefined : `Payment status: ${paymentIntent.status}`,
      };
    } catch (error: any) {
      console.error("Stripe verify payment error:", error);
      return {
        verified: false,
        errorMessage: error.message,
      };
    }
  }
  
  verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      if (!this.config.webhookSecret) {
        console.warn("Stripe webhook secret not configured");
        return false;
      }
      
      this.stripe.webhooks.constructEvent(payload, signature, this.config.webhookSecret);
      return true;
    } catch (error) {
      console.error("Stripe webhook verification error:", error);
      return false;
    }
  }
  
  async getPaymentStatus(paymentId: string): Promise<{ status: string; method?: string }> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentId);
      return {
        status: paymentIntent.status,
        method: paymentIntent.payment_method_types?.[0],
      };
    } catch (error: any) {
      console.error("Stripe get payment status error:", error);
      throw new Error(`Failed to fetch payment status: ${error.message}`);
    }
  }
}
