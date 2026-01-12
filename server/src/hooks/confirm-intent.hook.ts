export const sendWebhook = async (merchantUrl: string, payload: any) => {
  try {
    const res = await fetch(merchantUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-YourSaaS-Signature": "sec_verify_123",
      },
      body: JSON.stringify({
        type: "payment_intent.succeeded",
        created: new Date().toISOString(),
        data: payload,
      }),
    });

    return res.ok;
  } catch (e) {
    console.error("Webhook Delivery Failed:", e);
    return false;
  }
};
