import PaymentIntent from "../models/PaymentIntent.model.js";
import { v4 as uuidv4 } from "uuid";
import type { Currencies } from "../types/rates.type.js";
import { executePayment } from "../gateway/processor.js";
import { sendWebhook } from "../hooks/confirm-intent.hook.js";

export const create = async (
  merchantId: string,
  amount: number,
  currency: Currencies,
) => {
  const intentId = `pi_${Math.random().toString(36).slice(2, 9)}`;

  const intent = await PaymentIntent.create({
    id: intentId,
    merchant_id: merchantId,
    amount: amount,
    amount_received: 0,
    currency: currency,
    status: "requires_payment_method",
    client_secret: `${intentId}_secret_${uuidv4().split("-")[0]}`,
    live: true,
  });

  return intent;
};
