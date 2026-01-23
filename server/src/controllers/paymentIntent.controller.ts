import PaymentIntent from "../models/PaymentIntent.model.js";
import { RATES } from "../types/rates.type.js";
import * as PaymentService from "../services/payment.service.js";
import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { executePayment } from "../gateway/processor.js";
import Merchant from "../models/Merchant.model.js";
import Product from "../models/Product.model.js";

/* SDK SIDE */
export const create = async (req: Request, res: Response) => {
  try {
    const { items, passkey, amount_received } = req.body;

    const merchant = await Merchant.findOne({ passkey });
    if (!merchant) return res.status(401).json({ msg: "Invalid Merchant" });

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ msg: "No items provided" });
    }

    let totalAmount = 0;
    const lineItems = [];
    let detectedCurrency = "GEL";

    for (const item of items) {
      const product = await Product.findOne({
        id: item.productId,
        merchant_id: merchant.id,
      });

      if (!product) continue;

      detectedCurrency = product.currency;

      const qty = item.quantity || 1;
      totalAmount += product.price * qty;

      lineItems.push({
        name: product.name,
        quantity: qty,
        price: product.price,
      });
    }

    if (totalAmount === 0)
      return res.status(400).json({ msg: "Invalid items" });

    const id = `pi_${uuidv4().split("-")[0]}`;
    const secret = `${id}_secret_${uuidv4().split("-")[1]}`;

    const intent = await PaymentIntent.create({
      id,
      client_secret: secret,
      amount: totalAmount,
      amount_received: amount_received || 0,
      currency: detectedCurrency,
      merchant_id: merchant.id,
      merchant_name: merchant.legalName,
      metadata: {
        items: JSON.stringify(lineItems),
      },
      status: "requires_payment_method",
    });

    return res.status(201).json({
      id: intent.id,
      client_secret: intent.client_secret,
    });
  } catch (e: any) {
    return res.status(500).json({ msg: e.message });
  }
};

export const confirm = async (req: Request, res: Response) => {
  try {
    const { client_secret } = req.body;

    const intent = await PaymentIntent.findOne({ client_secret });
    if (!intent) throw new Error("Invalid Secret");

    if (intent.status === "succeeded") {
      return res.status(200).json({ status: "already paid for" });
    }

    const chargeSuccessful = await executePayment(intent.id);

    if (chargeSuccessful) {
      intent.status = "succeeded";
      intent.amount_received = intent.amount;
      await intent.save();

      await Merchant.findOneAndUpdate(
        { id: intent.merchant_id },
        { $inc: { credit: intent.amount } },
      );
      await PaymentService.deposit(
        intent.merchant_id,
        intent.amount,
        intent.currency,
        {
          brand: "visa",
          last4: "4242",
          country: "GE",
        },
      );

      return res.status(200).json({ status: "succeeded" });
    }

    return res.status(400).json({ status: "failed" });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

export const publicIntent = async (req: Request, res: Response) => {
  const { secret } = req.params;

  if (!secret) return res.status(400).json({ msg: "missing client secret!" });

  const intent = await PaymentIntent.findOne({ client_secret: secret });
  if (!intent) return res.status(404).json({ msg: "Link Expired" });

  const merchant = await Merchant.findOne({ id: intent.merchant_id });

  // @ts-ignore
  const displayItems = Array.isArray(intent.items) ? intent.items : [];
  // let displayItems = [];
  //   try {
  //     if (intent.metadata?.items) {
  //       displayItems = typeof intent.metadata.items === 'string'
  //         ? JSON.parse(intent.metadata.items)
  //         : intent.metadata.items;
  //     }
  //   } catch (e) {
  //     console.error("Failed to parse metadata items", e);
  //     displayItems = [];
  //   }

  return res.json({
    amount: intent.amount,
    currency: intent.currency,
    status: intent.status,
    merchantName: intent.merchant_name || merchant?.legalName,
    merchantVerified: merchant?.emailVerified || false,
    success_url: merchant?.success_url,
    failed_url: merchant?.failed_url,
    base_redirect: merchant?.base_redirect,
    items: displayItems,
  });
};

export const urlConfig = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const merchantId = req.merchant.id;
    const { success_url, failed_url, base_redirect } = req.body;

    const urlRegex = /^(https?:\/\/)/;
    if (success_url && !urlRegex.test(success_url)) {
      return res.status(400).json({
        msg: "Invalid success URL format. Must start with http or https",
      });
    }
    if (failed_url && !urlRegex.test(failed_url)) {
      return res.status(400).json({
        msg: "Invalid failed URL format. Must start with http or https",
      });
    }

    const DEFAULT_SUCCESS =
      "https://soteria-client.onrender.com/checkout/success";
    const DEFAULT_FAILED =
      "https://soteria-client.onrender.com/checkout/failed";

    const updatedMerchant = await Merchant.findByIdAndUpdate(
      merchantId,
      {
        success_url: success_url || DEFAULT_SUCCESS,
        failed_url: failed_url || DEFAULT_FAILED,
        base_redirect: base_redirect || "",
        setup: true,
      },
      { new: true, runValidators: true },
    );

    if (!updatedMerchant) {
      return res.status(404).json({ msg: "Merchant not found" });
    }

    return res.status(200).json({
      msg: "Settings updated successfully",
      data: {
        success: updatedMerchant.success_url,
        failed: updatedMerchant.failed_url,
        base: updatedMerchant.base_redirect,
        setup: updatedMerchant.setup,
      },
    });
  } catch (e) {
    console.error("URL_CONFIG_ERROR:", e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// export const validate = async (req: Request, res: Response) => {

// }
