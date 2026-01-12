import type { Object } from "../types/object.type.js";
import type { Currencies } from "../types/rates.type.js";

export interface TransactionI {
  // required
  id: string;
  object: Object;
  account_id: string;
  amount: number;
  fee: number;
  currency: Currencies;
  redisplay: "allowed" | "limited" | "unspecified";
  status: "open" | "cancelled" | "declined" | "completed" | "void";
  live: boolean;
  created_at: Date;

  // ? fields
  customer?: string | null;
  card: {
    brand: "visa" | "mastercard" | "tbc" | "credo" | "bog";
    last4: string;
    check?: "pass" | "fail" | "unavailable" | "unchecked";
    country: string;
    fingerprint: string;
    network: {
      code?: string | null;
      reason?: string | null;
      status?: string | null;
    };
  };
  metadata?: object;
}
