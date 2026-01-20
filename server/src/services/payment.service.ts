import Balance from "../models/Balance.model.js";
import Transaction from "../models/Transaction.model.js";
import { v4 as uuidv4 } from "uuid";
import { RATES } from "../types/rates.type.js";

export const deposit = async (
  id: string,
  amount: number,
  currency: keyof typeof RATES,
  card: {
    brand: "visa" | "mastercard" | "tbc" | "credo" | "bog";
    last4: string;
    country: "GE" | "US";
  },
) => {
  let balance = await Balance.findOneAndUpdate(
    { account_id: id },
    {
      $setOnInsert: {
        id: `bal_${uuidv4().split("-")[0]}`,
        account_id: id,
        pending: [],
        available: [],
        reserved: [],
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  const wallet = balance.pending.find((p: any) => p.currency === currency);

  if (wallet) wallet.amount += amount;
  else {
    balance.pending.push({
      amount: amount,
      currency: currency,
      type: "card",
    });
  }

  await balance.save();
  await Transaction.create({
    id: `txn_${uuidv4()}`,
    object: "transaction",
    account_id: id,
    status: "completed",
    amount: amount,
    currency: currency,
    live: false,
    card: card,
  });

  return balance;
};

export const authorize = async (
  id: string,
  amount: number,
  currency: keyof typeof RATES,
) => {
  const balance = await Balance.findOne({ account_id: id });
  if (!balance) throw new Error(`Cannot find requested document, Balance`);

  const wallet = balance.pending.find((p) => p.currency === currency);
  if (wallet) wallet.amount -= amount;
  else {
    balance.available.push({
      amount: amount,
      currency: currency,
      type: "card",
    });
  }

  await balance.save();
  return balance;
};

export const reserve = async (
  id: string,
  amount: number,
  currency: keyof typeof RATES,
) => {
  const balance = await Balance.findOne({ account_id: id });
  if (!balance) throw new Error(`cannot find requested document, Balance`);

  const wallet = balance.available.find((p) => p.currency === currency);

  if (!wallet || wallet.amount < amount) {
    throw new Error(`insufficient funds`);
  }

  wallet.amount -= amount;

  balance.reserved.push({
    amount: amount,
    currency: currency,
    reason: "payout",
  });

  await balance.save();
  return "reserved and being processed";
};

export const withdraw = async (id: string, tnxId: string) => {
  await Transaction.findOneAndUpdate({ id: tnxId }, { status: "completed" });

  const balance = await Balance.findOne({ account_id: id });
  if (!balance) throw new Error(`cannot find requested document, Balance`);

  balance.reserved = balance.reserved.filter((r) => r.reason !== "payout");
  balance.save();
  return "withdrawed";
};

export const withdrawFailed = async (
  id: string,
  tnxId: string,
  amount: number,
  currency: keyof typeof RATES,
) => {
  const balance = await Balance.findOne({ account_id: id });
  if (!balance) throw new Error(`cannot find requested documet, Balance`);

  balance.reserved = balance.reserved.filter((r) => r.reason !== "payout");
  const wallet = balance.available.find((i) => i.currency === currency);

  if (wallet) wallet.amount += amount;
  else {
    balance.available.push({
      amount: amount,
      currency: currency,
      type: "card",
    });
  }

  await Transaction.findOneAndUpdate({ id: tnxId }, { status: "declined" });

  await balance.save();
  return "withdraw fail";
};

export const currencyConversion = async (
  id: string,
  amount: number,
  from: keyof typeof RATES,
  to: keyof typeof RATES,
  card: {
    brand: "visa" | "mastercard" | "tbc" | "credo" | "bog";
    last4: string;
    country: "GE" | "US";
  },
) => {
  const balance = await Balance.findOne({ account_id: id });
  if (!balance) throw new Error(`cannot find requested document, Balanbce`);

  const fromB = balance.available.find((c) => c.currency === from);
  if (!fromB || fromB.amount < amount) {
    throw new Error(`insufficient funds`);
  }

  const conversion = (amount / RATES[from]) * RATES[to];
  fromB.amount -= amount;

  const wallet = balance.available.find((c) => c.currency === to);
  if (wallet) wallet.amount += conversion;
  else {
    balance.available.push({
      amount: conversion,
      currency: to,
      type: "card",
    });
  }

  await Transaction.create({
    id: `conv_${uuidv4()}`,
    object: "transaction",
    account_id: id,
    status: "completed",

    metadata: { rate: RATES[from], original: from, to },

    live: false,
    card: {
      brand: card.brand,
      last4: card.last4,
      country: card.country,
    },
  });

  await balance.save();
  return { original: amount, converted: conversion };
};

export const useReserve = async (
  id: string,
  price: number,
  currency: keyof typeof RATES,
) => {
  const balance = await Balance.findOne({ account_id: id });
  if (!balance) throw new Error(`cannot find requested document, Balance`);

  const wallet = balance.available.find((c) => c.currency === currency);
  if (!wallet || wallet.amount < price) {
    throw new Error(`insufficient funds`);
  }

  wallet.amount -= price;
  balance.reserved.push({
    amount: price,
    currency: currency,
    reason: "reserve",
  });

  await balance.save();
  return "funds locked";
};

export const clearBalance = async (
  id: string,
  amount: number,
  currency: keyof typeof RATES,
) => {
  const balance = await Balance.findOne({ account_id: id });
  if (!balance) throw new Error(`cannot find requested document, Balance`);

  const pending = balance.pending.find((c) => c.currency === currency);
  if (!pending || pending.amount < amount) {
    throw new Error(`insufficient funds`);
  }
  pending.amount -= amount;

  const available = balance.available.find((c) => c.currency === currency);
  if (!available || available.amount < amount) {
    throw new Error(`cannot find requested document, Balance`);
  }

  if (available) available.amount += amount;
  else {
    balance.available.push({
      amount: amount,
      currency: currency,
      type: "card",
    });
  }

  await balance.save();
  return "cleared";
};
