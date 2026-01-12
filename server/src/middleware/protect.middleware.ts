import jwt from "jsonwebtoken";
import Merchant from "../models/Merchant.model.js";

export const protect = async (req: any, res: any, next: any) => {
  const token = req.cookies?.hs;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT!) as any;
    const merchant = await Merchant.findById(decoded.id);

    if (!merchant)
      return res.status(401).json({ message: "Merchant no longer exists" });

    req.merchant = merchant;
    req.user = { id: merchant._id };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Session" });
  }
};
