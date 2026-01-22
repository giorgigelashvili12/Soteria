import { useState, useEffect } from "react";
import axios from "axios";
import { Wallet, ArrowUpRight, RefreshCcw, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FinanceStats, Transaction } from "../@types";

export default function Balances() {
  const [stats, setStats] = useState<FinanceStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://soteria-q27e.onrender.com/api/v1/balances/stats",
          { withCredentials: true },
        );

        const { balance, transactions, volume } = res.data;

        const data: FinanceStats = {
          balance,
          transactions,
          totalVolume: volume,
        };

        console.log(data);
        setStats(data);
      } catch (e) {
        console.error("Failed to fetch finance stats", e);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-stone-400" size={32} />
      </div>
    );
  }

  const available = (stats?.balance?.available?.[0]?.amount || 0) / 100;
  const pending = (stats?.balance?.pending?.[0]?.amount || 0) / 100;
  const currency = stats?.balance?.available?.[0]?.currency || "GEL";

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Balances</h1>
        <p className="text-stone-500">Track your earnings and settlements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-emerald-100 bg-emerald-50/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">
              Available for Payout
            </CardTitle>
            <Wallet className="size-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {available.toFixed(2)} {currency}
            </div>
            <p className="text-xs text-emerald-600 mt-1">
              Ready to withdraw to bank
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-amber-50/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">
              Pending Settlement
            </CardTitle>
            <RefreshCcw className="size-4 text-amber-600 animate-spin-slow" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {pending.toFixed(2)} {currency}
            </div>
            <p className="text-xs text-amber-600 mt-1">Clears in T+3 days</p>
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-stone-600">
              Total Volume (Gross)
            </CardTitle>
            <ArrowUpRight className="size-4 text-stone-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900">
              {((stats?.totalVolume || 0) / 100).toFixed(2)} {currency}
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Lifetime processed amount
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Ledger Activity</h3>
        <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-medium">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {stats?.transactions && stats.transactions.length > 0 ? (
                stats.transactions.map((txn: Transaction) => (
                  <tr
                    key={txn.id}
                    className="hover:bg-stone-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs">{txn.id}</td>
                    <td className="px-6 py-4 capitalize">{txn.object}</td>
                    <td className="px-6 py-4 font-semibold">
                      {txn.amount} {txn.currency}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          txn.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-stone-400">
                      {new Date(txn.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-stone-400"
                  >
                    No transactions found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
