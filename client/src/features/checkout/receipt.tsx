export const receipt = (id: string, merchant: string, amount: number) => {
  const content = `
    SOTERIA RECEIPT
    -------------------------
    Status: Verified & Settled
    Reference: #${id},
    Date: ${new Date().toLocaleString()},

    Merchant: ${merchant},
    Amount: ${amount},

    The transaction was recorded and secured on Soteria.
    -------------------------
    Thank you for using Soteria
    `;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `soteria_receipt_${id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
