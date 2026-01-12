import type { Object } from "../types/object.type.js";
import type { Currencies } from "../types/rates.type.js";

export interface RefundI {
  id: string;
  object: Object;
  amount: number;
  source: {
    balance: string;
    charge: string;
    payment: string;
  };
  created_at: Date;
  currency: Currencies;
  destination?: {
    type: "card" | "balance";
    card: {
      reference?: string | null;
      reference_status: "pending" | "available" | "unavailable";
      type: "pending" | "refund" | "reversal";
    };
  };
  metadata?: object | {};
  reason?: string | null;
  receipt?: string | null;
  status: "open" | "declined" | "completed";
  live: boolean;
  transaction_id?: string | null;
}
