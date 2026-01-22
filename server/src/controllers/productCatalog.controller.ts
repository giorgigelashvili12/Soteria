import type { Request, Response } from "express";
import Product from "../models/Product.model.js";
import { RATES } from "../types/rates.type.js";
import { v4 as uuidv4 } from "uuid";
import Merchant from "../models/Merchant.model.js";
import PaymentIntent from "../models/PaymentIntent.model.js";
import crypto from "crypto";

export const get = async (req: Request, res: Response) => {
  try {
    const mer_id = (req as any).merchant.id;

    const { id, sku } = req.query;

    const filter: any = { merchant_id: mer_id };

    if (id || sku) {
      filter.$or = [];
      if (id) filter.$or.push({ id: id });
      if (sku) filter.$or.push({ sku: sku });
    }

    const product = await Product.findOne(filter);

    if (!product) {
      return res.status(404).json({
        msg: "No product found matching those criteria",
        criteria: filter,
      });
    }

    return res.status(200).json({ msg: "Found successfully", product });
  } catch (e) {
    console.error("GET Error:", e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    console.warn("triggered");
    // @ts-ignore
    const merchantId = req.merchant.id;
    console.log(merchantId);
    const products = await Product.find({ merchant_id: merchantId }).lean();
    console.log(products, products.length);
    return res.status(200).json(products);
  } catch (e) {
    return res.status(500).json({ msg: "Dashboard fetch failed" });
  }
};

export const sdkAll = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const merchantId = req.merchant.id;
    const products = await Product.find({ merchant_id: merchantId }).lean();
    return res.status(200).json(products);
  } catch (e) {
    return res.status(500).json({ msg: "API fetch failed" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, price, currency, description, image_url, sku } = req.body;
    //@ts-ignore
    const mer_id = req.merchant.id;

    if (!name || !price || !sku) {
      return res
        .status(400)
        .json({ msg: "invalid required fields: name, price or sku" });
    }

    if (price <= 0 || typeof price !== "number") {
      return res.status(400).json({ msg: "invalid parameter: price" });
    }

    if (!(currency in RATES)) {
      return res.status(400).json({ msg: "currency not supported" });
    }

    const skuExists = await Product.findOne({ sku, mer_id });
    if (skuExists) {
      return res
        .status(409)
        .json({ msg: "sku already exsts in your catalog", skuExists });
    }

    const product = await Product.create({
      id: `prod_${uuidv4().split("-")[0]}`,
      merchant_id: mer_id,
      //@ts-ignore
      merchant_name: req.merchant.legalName,
      name,
      price: Math.round(price),
      currency,
      sku: sku.toUpperCase().trim(),
      description: description || "",
      image_url: image_url || "",
    });

    return res.status(201).json({ msg: "created", product });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "internal server error", e });
  }
};

export const edit = async (req: Request, res: Response) => {
  try {
    const { id, name, price, currency, sku, description, image_url, passkey } =
      req.body;

    const merchant = await Merchant.findOne({ passkey });

    if (!merchant) {
      console.log(401);
      return res.status(401).json({ msg: "Unauthorized: Invalid Passkey" });
    }

    const mer_id = merchant.id;

    if (!name || !price || !sku || !id) {
      console.log(400);
      return res
        .status(400)
        .json({ msg: "invalid required fields: id, name, price or sku" });
    }

    if (price <= 0 || typeof price !== "number") {
      console.log(400, "price");
      return res.status(400).json({ msg: "invalid parameter: price" });
    }

    if (!(currency in RATES)) {
      console.log(400, "cur");
      return res.status(400).json({ msg: "currency not supported" });
    }

    const skuConflict = await Product.findOne({
      sku,
      merchant_id: mer_id,
      id: { $ne: id },
    });

    if (skuConflict) {
      console.log(409);
      return res.status(409).json({ msg: "sku used by another product" });
    }

    const edited = await Product.findOneAndUpdate(
      { id, merchant_id: mer_id },
      { name, price, currency, sku, description, image_url },
      { new: true, runValidators: true },
    );

    if (!edited) {
      console.log(404);
      return res.status(404).json({ msg: "product not found" });
    }

    return res.status(200).json({ msg: "success", product: edited });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({
      msg: "internal server error",
      error: e.message,
      stack: e.stack,
      details: e,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    //@ts-ignore
    const mer_id = req.merchant.id;

    if (!id) {
      return res.status(400).json({ msg: "product id is required" });
    }

    const deleted = await Product.findOneAndDelete({
      id: id,
      merchant_id: mer_id,
    });

    if (!deleted) {
      return res.status(404).json({ msg: "product not found" });
    }

    return res.status(200).json({ msg: "product deleted", deleted: id });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "internal server error", data: e });
  }
};

export const sync = async (req: Request, res: Response) => {
  const { passkey, products } = req.body;

  if (!passkey) {
    return res.status(400).json({ msg: "missing passkey" });
  }

  const merchant = await Merchant.findOne({ passkey });
  if (!merchant) {
    return res.status(401).json({ msg: "invalid passkey" });
  }

  const bulkOp = products.map((prod: any) => ({
    updateOne: {
      filter: { sku: prod.sku, merchant_id: merchant.id },
      update: {
        $set: {
          name: prod.name,
          price: prod.price,
          description: prod.description,
        },
        $setOnInsert: {
          id: `prod_${uuidv4().split("-")[0]}`,
          merchant_id: merchant.id,
          sku: prod.sku,
        },
      },
      upsert: true,
    },
  }));

  try {
    await Product.bulkWrite(bulkOp);
    return res.json({ msg: `synced ${products.length} products` });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "internal server error" });
  }
};

export const createCheckout = async (req: Request, res: Response) => {
  const { passkey, items } = req.body;
  const signature = req.headers["x-soteria-signature"];

  try {
    const merchant = await Merchant.findOne({ passkey });
    if (!merchant) {
      return res.status(401).json({ msg: "invalid passkey" });
    }

    const expected = crypto
      .createHmac("sha256", merchant.secret_key)
      .update(JSON.stringify(items))
      .digest("hex");

    if (signature !== expected) {
      return res
        .status(403)
        .json({ msg: "signature mismatch, data may have been tampered with" });
    }

    let totalAmount = 0;
    const lineItems = [];

    for (const item of items) {
      let finalPrice;
      let name;

      if (item.id) {
        const product = await Product.findOne({
          id: item.id,
          merchant_id: merchant.id,
        });
        if (!product) {
          return res
            .status(404)
            .json({ msg: `product ${item.id} not found in catalog` });
        }
        finalPrice = product.price;
        name = product.name;
      } else if (item.price && item.name) {
        finalPrice = item.price;
        name = item.name;
      } else {
        return res
          .status(400)
          .json({ msg: "every item must have an id or a name and price" });
      }

      totalAmount += finalPrice * item.quantity;
      lineItems.push({
        name,
        price: finalPrice,
        quantity: item.quantity,
        sku: item.sku || "DYNAMIC",
      });
    }

    const id = `pi_${crypto.randomBytes(12).toString("hex")}`;

    const intent = await PaymentIntent.create({
      id,
      merchant_id: merchant.id,
      merchant_name: merchant.legalName,
      amount: totalAmount,
      amount_received: 0,
      currency: "GEL",
      items: lineItems,
      status: "requires_payment_method",
      client_secret: `pi_${crypto.randomBytes(16).toString("hex")}`,
    });

    return res.json({
      clientSecret: intent.client_secret,
      amount: totalAmount,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "internal server error" });
  }
};
