import { jsPDF } from "jspdf";

export const receipt = (id: string, merchant: string, amount: number) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a5",
  });

  const forestGreen = "#064e3b";
  const emeraldMain = "#10b981";
  const softEmerald = "#ecfdf5";
  const textGray = "#4b5563";

  doc.setFillColor(forestGreen);
  doc.rect(0, 0, 148, 45, "F");

  doc.setFillColor(emeraldMain);
  doc.rect(0, 43, 148, 2, "F");

  doc.setTextColor("#ffffff");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("SOTERIA", 15, 22);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#a7f3d0");
  doc.text("LEDGER-VERIFIED TRANSACTION", 15, 30);

  doc.setFillColor(emeraldMain);
  doc.roundedRect(90, 15, 43, 10, 1, 1, "F");
  doc.setTextColor("#ffffff");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("SECURE PAYMENT", 111.5, 21.5, { align: "center" });

  doc.setTextColor(forestGreen);
  doc.setFontSize(11);
  doc.text("RECEIPT DETAILS", 15, 60);

  doc.setDrawColor(emeraldMain);
  doc.setLineWidth(0.5);
  doc.line(15, 63, 133, 63);

  const startY = 75;
  doc.setFontSize(9);
  doc.setTextColor(textGray);
  doc.setFont("helvetica", "normal");

  doc.text("Ref Number:", 15, startY);
  doc.text("Timestamp:", 15, startY + 10);
  doc.text("Merchant:", 15, startY + 20);

  doc.setTextColor(forestGreen);
  doc.setFont("helvetica", "bold");
  doc.text(id.toUpperCase(), 50, startY);
  doc.text(new Date().toLocaleString(), 50, startY + 10);
  doc.text(merchant.toUpperCase(), 50, startY + 20);

  doc.setFillColor(softEmerald);
  doc.roundedRect(15, 105, 118, 25, 2, 2, "F");

  doc.setFillColor(emeraldMain);
  doc.rect(15, 105, 2, 25, "F");

  doc.setFontSize(10);
  doc.setTextColor(forestGreen);
  doc.text("AMOUNT SETTLED", 25, 115);

  doc.setFontSize(22);
  doc.setTextColor(emeraldMain);
  doc.text(`${amount.toFixed(2)} GEL`, 125, 122, { align: "right" });

  doc.setFontSize(40);
  doc.setTextColor(230, 230, 230);
  doc.setFont("helvetica", "bold");
  doc.saveGraphicsState();
  doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
  doc.text("SOTERIA", 74, 150, { align: "center", angle: 315 });
  doc.restoreGraphicsState();

  doc.setDrawColor("#d1d5db");
  doc.line(20, 185, 128, 185);

  doc.setTextColor(textGray);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.text(
    "This document serves as an official record of a ledger-protected transaction.",
    74,
    192,
    { align: "center" },
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(emeraldMain);
  doc.text("VERIFIED BY SOTERIA PROTOCOL", 74, 197, { align: "center" });

  doc.save(`Soteria_Receipt_${id}.pdf`);
};
