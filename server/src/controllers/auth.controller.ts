import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Merchant from "../models/Merchant.model.js";
import Session from "../models/Session.model.js";
import type { Request, Response } from "express";
import { transactionalApi } from "../services/brevo.service.js";
import { pincode } from "../utils/pincode.js";
import geoip from "geoip-lite";
import Membership from "../models/Membership.model.js";
import Workspace from "../models/Workspace.model.js";

dotenv.config();

const JWT = process.env.JWT!;

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, country, legalName } = req.body;

    if (!email || !password || !country || !legalName) {
      return res.status(400).json({ msg: "invalid fields" });
    }

    const exists = await Merchant.findOne({ email: email });
    if (exists) return res.status(400).json({ msg: "email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const emailToken = pincode();

    // test integration
    const header = req.headers["x-forwarded-for"];
    const remoteAddress = req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    // tu header array arsebobs aige pirveli elementi, tu ara mashin ixmare remoteADress, tu egec undefined ari mashin chveulebrivi ragac misamarti
    const ip =
      (Array.isArray(header) ? header[0] : header) ||
      remoteAddress ||
      "127.0.0.1";

    const geo = geoip.lookup(ip);
    const location = geo ? `${geo.city}, ${geo.country}` : "Unknown Location";
    const passkey = `mk_${crypto.randomBytes(12).toString("hex")}`;
    const secretKey = `sk_${crypto.randomBytes(24).toString("hex")}`;

    const merchant = new Merchant({
      id: `mch_${crypto.randomBytes(6).toString("hex")}`,
      email,
      legalName,
      password: hash,
      country,
      lastLoginIp: ip,
      sessions: [
        {
          ip,
          userAgent,
          location,
          lastUsed: new Date(),
        },
      ],
      //////
      documents: [
        {
          category: "kyc",
          type: "merchant",
          documentId: crypto.randomBytes(16).toString("hex"),
        },
      ],
      documentVerified: false,
      passkey: passkey,
      secret_key: secretKey,
      status: "pending",
      emailVerified: false,
      emailVerificationToken: emailToken,
      expiryDate: Math.floor(Date.now() / 1000) + 31536000,
    });

    await merchant.save();

    const workspace = new Workspace({
      name: `${legalName}'s Workspace`,
      owner_id: merchant._id,
      status: "test",
    });
    await workspace.save();

    const membership = new Membership({
      workspace_id: workspace._id,
      merchant_id: merchant._id,
      role: "owner",
      status: "active",
    });
    await membership.save();

    await transactionalApi.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER,
        name: "Soteria",
      },
      to: [
        {
          email: email,
          name: legalName,
        },
      ],
      subject: "Verify Your Email",
      htmlContent: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1>Welcome to Soteria</h1>
          <p>Hi ${legalName},</p>
          <p>Please click the button below to verify your email. This link will expire shortly.</p>

          <a href="https://soteria-client.onrender.com/verify-email?email=${encodeURIComponent(email)}&token=${emailToken}"
             style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
             Verify My Email
          </a>

          <a href="https://soteria-client.onrender.com/verify-pin?email=${encodeURIComponent(email)}">
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              Or use your verification code: <strong>${emailToken}</strong>
            </p>
          </a>
        </div>
      `,
    });

    const token = jwt.sign(
      {
        id: merchant._id,
        email: merchant.email,
        activeWorkspace: workspace._id,
      },
      JWT,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("hs", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(201).json({
      status: "success",
      msg: "user created, verify your email",
      data: { id: merchant._id, email: merchant.email, location },
    });
  } catch (e: any) {
    console.log(e);

    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "email and password required" });
    }

    const merchant = await Merchant.findOne({ email });
    if (!merchant) return res.status(400).json({ msg: "invalid credentials" });

    const valid = await bcrypt.compare(password, merchant.password);
    if (!valid) return res.status(400).json({ msg: "invald credentials" });

    const token = jwt.sign(
      { id: merchant._id.toString(), email: merchant.email },
      JWT,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("hs", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      msg: "login successful",
      data: { id: merchant._id, email: merchant.email },
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("hs");
  res.status(200).json({ msg: "logged out", data: "success" });
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, token } = req.body;

    if (!token || !token) {
      return res
        .status(400)
        .json({ msg: "missing or invalid token or email not entered" });
    }

    const merchant = await Merchant.findOne({
      email: email,
      emailVerificationToken: token,
    });
    if (!merchant) {
      return res.status(400).json({ msg: "account not found" });
    }

    if (merchant.emailVerified) {
      return res.status(409).json({ msg: "email already verified" });
    }

    merchant.emailVerified = true;
    merchant.emailVerificationToken = null;
    merchant.credit = 10;
    merchant.status = "approved";
    await merchant.save();

    await transactionalApi.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER,
        name: "Soteria",
      },
      to: [
        {
          email: merchant.email,
          name: merchant.legalName,
        },
      ],
      subject: "Email Verified",
      htmlContent: `
        <h1>Welcome, ${merchant.legalName}!</h1>
        <p>Your email has been verified. Your account is now under review. We'll notify you once it's approved</p>
      `,
    });

    return res.status(200).json({ msg: "email verified, access granted" });
  } catch (e: any) {
    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const merchantId = req.merchant._id;

    const activeMembership = await Membership.findOne({
      merchant_id: merchantId,
      status: "active",
    }).populate("workspace_id");

    res.status(200).json({
      status: "success",
      //@ts-ignore
      merchant: req.merchant,
      membership: activeMembership,
    });
  } catch (e: any) {
    console.error(e);
    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
};

/*
async(req: Request, res: Response) => {
  try {

  } catch(e: any) {
    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
}
*/
