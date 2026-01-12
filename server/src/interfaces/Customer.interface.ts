import type { Object } from "../types/object.type.js";
import type { Currencies } from "../types/rates.type.js";

export interface CustomerI {
  id: string;
  object: Object;
  balance?: number;
  created_at: Date;
  currency: Currencies;
  default_score?: object | null;
  description?: string | null;
  email?: string | null;
  // invoice_settings: {
  //
  // };
  livemode: boolean;
  metadata?: object;
  name?: string | null;
  phone?: string | null;

  shipping: {
    address: {
      city?: string | null;
      country?: string | null;
      line1?: string | null;
      postal_code?: string | null;
      state?: string | null;
    };
    name?: string | null;
    tracking_number?: string | null;
  };
}
