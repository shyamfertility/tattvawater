export interface PaymentProviderConfig {
  apiKey: string;
  apiSecret: string;
  webhookSecret?: string;
}

export interface CreateOrderOptions {
  amount: number;
  currency: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export interface VerifyPaymentOptions {
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface PaymentOrderResult {
  id: string;
  amount: number;
  currency: string;
  status: string;
  receipt?: string;
}

export interface PaymentVerificationResult {
  verified: boolean;
  paymentId?: string;
  errorMessage?: string;
}

export abstract class PaymentProvider {
  protected config: PaymentProviderConfig;
  
  constructor(config: PaymentProviderConfig) {
    this.config = config;
  }
  
  abstract get providerName(): string;
  
  abstract createOrder(options: CreateOrderOptions): Promise<PaymentOrderResult>;
  
  abstract verifyPayment(options: VerifyPaymentOptions): Promise<PaymentVerificationResult>;
  
  abstract verifyWebhookSignature(payload: string, signature: string): boolean;
  
  abstract getPaymentStatus(paymentId: string): Promise<{ status: string; method?: string }>;
}
