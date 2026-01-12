import type { Object } from "../types/object.type.js";
import type { Currencies } from "../types/rates.type.js";

export interface ChargeI {
  id: string;
  object: Object;
  amount: number;
  amount_received?: number | null;
  amount_refunded?: number | null;
  app_source?: string | null;
  app_fee?: number | null;
  balance?: string | null;
  captured?: boolean;
  currency: Currencies;
  customer_id?: string | null;
  description?: string | null;
  live: boolean;
  metadata?: Object;
  /* diagnose data */
  failure_balance?: string | null;
  failure_code?: string | null;
  failure_message?: string | null;
  fraud_details: {
    user_report?: string | null;
    platform_report?: string | null;
  };
  result: {
    network_status?: string | null; // approved, declined, not_sent to/by_network
    reason?: string | null; // bank code
    risk_level?: string | null; // text label
    risk_score?: string | null; // 0-100
    type?: string | null; // authorized, blocked, review (who approved)
  };
  /* ********** */
  paid?: boolean;
  payment_intent?: string | null;
  payment_method?: string | null;
  payment_method_details: {
    card: {
      brand: "visa" | "mastercard" | "tbc" | "credo" | "bog";
      last4: string;
      check: "pass" | "fail" | "unavailable" | "unchecked";
      country: "GE" | "US";
      fingerprint: string;
      network: {
        code?: string;
        reason?: string;
        status?: string;
      };
    };
  };
}
