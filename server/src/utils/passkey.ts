import crypto from "crypto";

export const passkey = (prefix: string = "mk"): string => {
  const randomBits = crypto.randomBytes(32).toString("hex");
  return `${prefix}_${randomBits}`;
};
