import Merchant from "../models/Merchant.model.js";
import jwt from "jsonwebtoken";

export const dash = async (req: any, res: any, next: any) => {
  const token = req.cookies?.hs;
  if (!token) return res.status(401).json({ msg: "No session found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT!) as any;
    const merchant = await Merchant.findById(decoded.id);
    if (!merchant) return res.status(401).json({ msg: "Merchant not found" });

    req.merchant = merchant;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Session expired" });
  }
};
