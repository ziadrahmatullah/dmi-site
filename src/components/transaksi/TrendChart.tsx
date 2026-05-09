"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import type { TrendItem } from "@/types/transaksi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendChartProps {
  trendData: TrendItem[];
  filter: "ytd" | "mtd";
  year: number;
  month: number;
  loading: boolean;
  onFilterChange: (filter: "ytd" | "mtd", year: number, month: number) => void;
}

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const YEARS = [2024, 2025, 2026];

function formatYAxis(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}M`;
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}jt`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}rb`;
  return String(value);
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-semibold text-gray-800 mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-medium">
          {entry.name === "total_income" ? "Pemasukan" : "Pengeluaran"}:{" "}
          {formatRupiah(entry.value)}
        </p>
      ))}
    </div>
  );
}

const selectClass =
  "h-8 border border-gray-200 rounded-lg px-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-dmi-green/40 focus:border-dmi-green transition-colors cursor-pointer";

export default function TrendChart({
  trendData,
  filter,
  year,
  month,
  loading,
  onFilterChange,
}: TrendChartProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Tren Transaksi</h3>
          <p className="text-xs text-gray-400 mt-0.5">Pemasukan vs Pengeluaran</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* YTD / MTD toggle */}
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {(["ytd", "mtd"] as const).map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange(f, year, month)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  filter === f
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Year */}
          <select
            value={year}
            onChange={(e) => onFilterChange(filter, Number(e.target.value), month)}
            className={selectClass}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* Month — only active for MTD */}
          <select
            value={month}
            onChange={(e) => onFilterChange(filter, year, Number(e.target.value))}
            disabled={filter === "ytd"}
            className={`${selectClass} disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      {loading ? (
        <Skeleton className="h-[200px] w-full" />
      ) : trendData.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center text-gray-400 text-sm">
          Belum ada data tren
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={trendData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="total_income"
              name="total_income"
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ r: 3, fill: "#16a34a", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="total_expense"
              name="total_expense"
              stroke="#e11d48"
              strokeWidth={2}
              dot={{ r: 3, fill: "#e11d48", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="inline-block w-5 h-0.5 bg-green-600 rounded" />
          Pemasukan
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="inline-block w-5 h-0.5 bg-rose-600 rounded" />
          Pengeluaran
        </div>
      </div>
    </div>
  );
}
