import type { Request, Response } from "express";
import * as PaymentService from "../services/payment.service.js";
import { RATES } from "../types/rates.type.js";

export const deposit = async (req: Request, res: Response) => {
  try {
    const { amount, currency, card } = req.body;
    //@ts-ignore
    const userId = req.merchant._id;

    if (amount < 0) {
      return res.status(400).json({ msg: "invalid amount" });
    }

    if (!(currency in RATES)) {
      return res.status(400).json({ msg: "currency not supported" });
    }

    const balance = await PaymentService.deposit(
      userId,
      amount,
      currency,
      card,
    );

    return res.status(200).json({
      msg: "deposit successful",
      data: balance,
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
};

export const authorize = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;
    //@ts-ignore
    const userId = req.merchant._id;

    if (amount < 0) {
      return res.status(400).json({ msg: "invalid amount" });
    }

    if (!(currency in RATES)) {
      return res.status(400).json({ msg: "currency not supported" });
    }

    const balance = await PaymentService.authorize(userId, amount, currency);

    return res.status(200).json({ msg: "balance authorized", data: balance });
  } catch (e: any) {
    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
};

export const reserve = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;
    //@ts-ignore
    const userId = req.merchant._id;

    if (amount < 0) {
      return res.status(400).json({ msg: "invalid amount" });
    }

    if (!(currency in RATES)) {
      return res.status(400).json({ msg: "currency not supported" });
    }

    const balance = await PaymentService.reserve(userId, amount, currency);

    return res
      .status(200)
      .json({ msg: "balance reserved and being processed", data: balance });
  } catch (e: any) {
    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
};

export const withdraw = async (req: Request, res: Response) => {
  try {
    const { tnxId } = req.body;
    //@ts-ignore
    const userId = req.merchant._id;

    const balance = await PaymentService.withdraw(userId, tnxId);

    return res.status(200).json({ msg: "withdrawed", data: balance });
  } catch (e: any) {
    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
};

export const rejectWithdrawal = async (req: Request, res: Response) => {
  try {
    const { tnxId, amount, currency } = req.body;
    //@ts-ignore
    const userId = req.merchant._id;

    if (amount < 0) {
      return res.status(400).json({ msg: "invalid amount" });
    }

    if (!(currency in RATES)) {
      return res.status(400).json({ msg: "currency not supported" });
    }

    const balance = await PaymentService.withdrawFailed(
      userId,
      tnxId,
      amount,
      currency,
    );

    return res.status(200).json({
      msg: "withdrawal rejected",
      data: balance,
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
};

export const currencyConversion = async (req: Request, res: Response) => {
  try {
    const { amount, from, to, card } = req.body;
    //@ts-ignore
    const userId = req.merchant._id;

    if (amount < 0) {
      return res.status(400).json({ msg: "invalid amount" });
    }

    if (!(from in RATES) || !(to in RATES)) {
      return res.status(400).json({ msg: "currency not supported" });
    }

    const balance = await PaymentService.currencyConversion(
      userId,
      amount,
      from,
      to,
      card,
    );

    return res.status(200).json({
      msg: "currency converted",
      data: balance,
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
};

/*
async (req: Request, res: Response) => {
  try {
  } catch (e: any) {
    return res
      .status(500)
      .json({ msg: "internal server error", err: e.message });
  }
};
*/
