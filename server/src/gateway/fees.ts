export interface FeeResult {
  amount_to_payout: number;
  fee_deducted: number;
}

export const withdrawalFee = (requestedAmount: number): FeeResult => {
  const FIXED_WITHDRAWAL_FEE = 150; //1.50 GEL in cents
  const MINIMUM_WITHDRAWAL = 500; // 5.00 GEL minimum

  if (requestedAmount < MINIMUM_WITHDRAWAL) {
    throw new Error(
      `Minimum withdrawal amount is ${MINIMUM_WITHDRAWAL / 100} GEL`,
    );
  }

  const fee = FIXED_WITHDRAWAL_FEE;

  return {
    amount_to_payout: requestedAmount - fee,
    fee_deducted: fee,
  };
};
