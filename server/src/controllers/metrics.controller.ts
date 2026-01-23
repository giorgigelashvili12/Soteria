import Transaction from "../models/Transaction.model.js";
import Balance from "../models/Balance.model.js";
import { v4 as uuidv4 } from "uuid";
import type { Request, Response } from "express";

// export const grossVolume = async (req: Request, res: Response) => {
//   try {
//     //@ts-ignore
//     const merchantId = req.merchant.id || req.merchant._id;
//     console.log(merchantId);

//     let tr = await Transaction.find({ account_id: merchantId }).sort({
//       created_at: 1,
//     });

//     const chartData = tr.map((t) => ({
//       date: new Date(t.created_at).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       }),
//       gross: t.amount || 0,
//       net: (t.amount || 0) - (t.fee || 0),
//     }));
//     console.log(chartData);

//     res.json(chartData);
//   } catch (e: any) {
//     console.error("Error:", e);
//     res.status(500).json({ msg: "error fetching metrics" });
//   }
// };

export const grossVolume = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const merchantId = req.merchant.id || req.merchant._id;

    const chartData = await Transaction.aggregate([
      {
        $match: { account_id: merchantId },
      },

      {
        $group: {
          _id: {
            $dateToString: { format: "%b %d", date: "$created_at" },
          },
          gross: { $sum: "$amount" },
          net: {
            $sum: {
              $subtract: ["$amount", { $ifNull: ["$fee", 0] }],
            },
          },
          sortDate: { $first: "$created_at" },
        },
      },

      {
        $sort: { sortDate: 1 },
      },

      {
        $project: {
          _id: 0,
          date: "$_id",
          gross: 1,
          net: 1,
        },
      },
    ]);

    res.json(chartData);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ msg: "error fetching metrics" });
  }
};
