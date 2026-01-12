import type { Object } from "../types/object.type.js";
import type { Currencies } from "../types/rates.type.js";

export interface BalanceI {
  id: string;
  object: Object;
  account_id: string;
  available: Array<{
    amount: number;
    currency: Currencies;
    type: "card";
  }>;
  pending: Array<{
    amount: number;
    currency: Currencies;
    type: "card";
  }>;
  reserved: Array<{
    amount: number;
    currency: Currencies;
    reason: "payout" | "dispute" | "reserve";
  }>;
  live: boolean;
  created_at: Date;
  updated_at: Date;
}
