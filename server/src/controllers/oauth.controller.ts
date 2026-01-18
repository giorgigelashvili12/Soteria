import type { Request, Response } from "express";
import axios from "axios";
import Merchant from "../models/Merchant.model.js";
import type { MerchantI } from "../interfaces/Merchant.interface.js";
import Workspace from "../models/Workspace.model.js";
import Membership from "../models/Membership.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import geoip from "geoip-lite";
import type { CookieOptions } from "express";
dotenv.config();

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

const createSendToken = (user: any, res: Response) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT!,
    { expiresIn: "1d" },
  );

  const isProd = process.env.NODE_ENV === "prod";
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24,
  };

  res.cookie("hs", token, cookieOptions);

  res.redirect(`${process.env.CLIENT_URL}/dashboard`);
};

export const getGoogleAuthUrl = (req: Request, res: Response) => {
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    redirect_uri: process.env.REDIRECT_URI!,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });

  res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
};

export const googleCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) return res.status(400).send("Missing code");

  const { data } = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const { data: profile } = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${data.access_token}` },
    },
  );

  const existingMerchant = await Merchant.findOne({ email: profile.email });

  const header = req.headers["x-forwarded-for"];
  const remoteAddress = req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const ip =
    (Array.isArray(header) ? header[0] : header) ||
    remoteAddress ||
    "127.0.0.1";
  const geo = geoip.lookup(ip);
  const location = geo ? `${geo.city}, ${geo.country}` : "Unknown Location";

  let merchant: any;

  if (existingMerchant) {
    merchant = existingMerchant;
  } else {
    const pk = `pk_${crypto.randomBytes(12).toString("hex")}`;
    const sk = `sk_${crypto.randomBytes(24).toString("hex")}`;
    merchant = await Merchant.create({
      id: `mch_${crypto.randomBytes(6).toString("hex")}`,
      legalName: profile.name,
      email: profile.email,
      oauth_id: profile.sub,
      oauth_provider: "google",
      password: `OAUTH_USER_${crypto.randomBytes(6).toString("hex")}`,
      country: "Unknown",
      lastLoginIp: ip,
      sessions: [
        {
          ip,
          userAgent,
          location,
          lastUsed: new Date(),
        },
      ],
      verifiedCountry: "Pending",
      status: "approved",
      premium: false,
      passkey: pk,
      secret_key: sk,
      emailVerified: true,
    } as any);

    const workspace = await Workspace.create({
      name: `${merchant.legalName}'s Workspace`,
      //@ts-ignore
      owner_id: merchant._id.toString(),
      status: "test",
    });
    await workspace.save();

    const membership = new Membership({
      workspace_id: workspace._id,
      //@ts-ignore
      merchant_id: merchant._id,
      role: "owner",
      status: "active",
    });
    await membership.save();
  }

  createSendToken(merchant, res);
};
