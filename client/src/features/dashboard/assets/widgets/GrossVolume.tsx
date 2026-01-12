import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Legend,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GrossVolume() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://soteria-back.vercel.app/api/v1/metrics/gross-volume",
        );
        console.log(res.data);
        setData(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
  return (
    <Card className="col-span-2 border-stone-200 shadow-sm overflow-hidden">
      <div className="h-1 w-full bg-emerald-500" />

      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-stone-800">
            Gross Volume Overview
          </h2>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 tracking-wider">
            LIVE
          </span>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#535b66", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#3d444d", fontSize: 12 }}
            />

            <Tooltip
              cursor={{ stroke: "#10b981", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              height={40}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="gross"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Gross Volume"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="net"
              stroke="#84cc16"
              strokeWidth={3}
              strokeDasharray="6 6"
              dot={{ r: 4, fill: "#84cc16", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Net Volume"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
