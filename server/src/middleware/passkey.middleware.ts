import type { Request, Response, NextFunction } from "express";
import Merchant from "../models/Merchant.model.js";

export const verifyPasskey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const passkey =
    req.headers["x-passkey"] || req.query.passkey || req.body?.passkey;

  if (!passkey) {
    return res.status(401).json({ msg: "Passkey required" });
  }

  try {
    const merchant = await Merchant.findOne({ passkey });
    if (!merchant) {
      return res.status(401).json({ msg: "Invalid passkey" });
    }

    (req as any).merchant = merchant;
    next();
  } catch (err) {
    return res.status(500).json({ msg: "Database error during auth", err });
  }
};
