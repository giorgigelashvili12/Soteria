import jwt from "jsonwebtoken";
import Merchant from "../models/Merchant.model.js";

export const protect = async (req: any, res: any, next: any) => {
  console.log("All Cookies:", req.cookies);
  console.log("HS Cookie:", req.cookies?.hs);
  const token = req.cookies?.hs;
  const passkey = req.query.passkey || req.headers["x-passkey"];

  try {
    let merchant;

    if (passkey) {
      merchant = await Merchant.findOne({ passkey });
    } else if (token) {
      const decoded = jwt.verify(token, process.env.JWT!) as any;
      merchant = await Merchant.findById(decoded.id);
    }

    if (!merchant)
      return res.status(401).json({ message: "Authentication failed" });

    req.merchant = merchant;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Session or Passkey" });
  }
};
