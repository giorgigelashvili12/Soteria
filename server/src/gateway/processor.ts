import mongoose from "mongoose";
import Transaction from "../models/Transaction.model.js";
import PaymentIntent from "../models/PaymentIntent.model.js";
import { v4 as uuidv4 } from "uuid";

export const withdrawal = async (
  merchantId: string,
  requestedAmount: number,
  currency: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const withdrawalFee = Math.max(100, Math.round(requestedAmount * 0.01));
    const netPayoutAmount = requestedAmount - withdrawalFee;

    if (netPayoutAmount <= 0) {
      throw new Error("Withdrawal amount too low to cover fees");
    }

    const payout = await Transaction.create(
      [
        {
          id: `po_${uuidv4().split("-")[0]}`,
          object: "payout",
          account_id: merchantId,
          amount: -requestedAmount,
          fee: withdrawalFee,
          currency: currency,
          status: "completed",
          live: true,
          metadata: {
            net_payout: netPayoutAmount,
            fee_applied: withdrawalFee,
          },
          card: {
            brand: "bog",
            last4: "0000",
            country: "GE",
            check: "pass",
          },
        },
      ],
      { session },
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const executePayment = async (intentId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const intent = await PaymentIntent.findOne({ id: intentId }).session(
      session,
    );
    if (!intent) throw new Error("Payment Intent not found");
    if (intent.status === "succeeded")
      throw new Error("Payment already processed");

    const FEE_PERCENT = 0.03;
    const fee = Math.round(intent.amount * FEE_PERCENT);
    const net = intent.amount - fee;

    const ledgerEntry = await Transaction.create(
      [
        {
          id: `txn_${uuidv4().split("-")[0]}`,
          object: "transaction",
          account_id: intent.merchant_id,
          amount: intent.amount,
          fee: fee,
          currency: intent.currency,
          status: "completed",
          live: intent.live,
          card: {
            brand: "visa",
            last4: "4242",
            country: "GE",
          },
        },
      ],
      { session },
    );

    intent.status = "succeeded";
    intent.amount_received = intent.amount;
    await intent.save({ session });

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      //@ts-ignore
      processor_id: ledgerEntry[0].id,
      net_amount: net,
      merchant_id: intent.merchant_id,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
