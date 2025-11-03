import { PaymentProvider } from "./PaymentProvider";
import { RazorpayProvider } from "./RazorpayProvider";
import { StripeProvider } from "./StripeProvider";

export type PaymentProviderType = "razorpay" | "stripe";

export interface PaymentServiceConfig {
  razorpay?: {
    keyId: string;
    keySecret: string;
    webhookSecret?: string;
  };
  stripe?: {
    secretKey: string;
    webhookSecret?: string;
  };
}

export class PaymentService {
  private providers: Map<PaymentProviderType, PaymentProvider>;
  
  constructor(config: PaymentServiceConfig) {
    this.providers = new Map();
    
    if (config.razorpay) {
      this.providers.set(
        "razorpay",
        new RazorpayProvider({
          apiKey: config.razorpay.keyId,
          apiSecret: config.razorpay.keySecret,
          webhookSecret: config.razorpay.webhookSecret,
        })
      );
    }
    
    if (config.stripe) {
      this.providers.set(
        "stripe",
        new StripeProvider({
          apiKey: "",
          apiSecret: config.stripe.secretKey,
          webhookSecret: config.stripe.webhookSecret,
        })
      );
    }
  }
  
  getProvider(type: PaymentProviderType): PaymentProvider {
    const provider = this.providers.get(type);
    if (!provider) {
      throw new Error(`Payment provider ${type} not configured`);
    }
    return provider;
  }
  
  detectProviderForRegion(currency: string, country?: string): PaymentProviderType {
    if (currency === "INR" || country === "IN") {
      if (this.providers.has("razorpay")) {
        return "razorpay";
      }
    }
    
    if (this.providers.has("stripe")) {
      return "stripe";
    }
    
    if (this.providers.has("razorpay")) {
      return "razorpay";
    }
    
    throw new Error("No payment provider available for this region");
  }
  
  isProviderAvailable(type: PaymentProviderType): boolean {
    return this.providers.has(type);
  }
}
