import type { Object } from "../types/object.type.js";
import type { Currencies } from "../types/rates.type.js";

export interface PaymentIntentI {
  id: string;
  object: Object;
  client_secret: string;
  items: {
    name: string;
    price: number;
    quantity: number;
    sku: string;
  }[];
  amount: number;
  amount_received: number;
  currency: Currencies;
  idempotency_key: string;
  status: "requires_payment_method" | "processing" | "succeeded" | "failed";
  customer_id?: string | null;
  merchant_id: string;
  merchant_name: string;
  description?: string | null;
  metadata?: object;
  live: boolean;
  created_at: Date;
  changed_at?: Date | null;
}
