"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import type { CategoryAllocationData, CategoryAllocationItem } from "@/types/transaksi";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ─── Helpers ───────────────────────────────────────────────────────── */

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPct(value: number): string {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }) + "%";
}

/* ─── Colour palettes ───────────────────────────────────────────────── */

const INCOME_COLORS = [
  "#15803d", "#16a34a", "#22c55e", "#4ade80",
  "#0ea5e9", "#3b82f6", "#8b5cf6", "#f59e0b",
];

const EXPENSE_COLORS = [
  "#e11d48", "#f97316", "#eab308", "#ec4899",
  "#8b5cf6", "#06b6d4", "#14b8a6", "#84cc16",
];

/* ─── Custom Tooltip ────────────────────────────────────────────────── */

interface TooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; payload: CategoryAllocationItem }[];
}

function PieTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-gray-800 mb-1">{d.category_name}</p>
      <p className="text-gray-600">{formatRupiah(d.total_amount)}</p>
      <p className="text-gray-400">{formatPct(d.percentage)} dari total</p>
      <p className="text-gray-400">{d.total_count} transaksi</p>
    </div>
  );
}

/* ─── Section (income or expense) ──────────────────────────────────── */

interface SectionProps {
  title: string;
  subtitle: string;
  total: number;
  categories: CategoryAllocationItem[];
  colors: string[];
  colLabel: string;
}

function AllocationSection({ title, subtitle, total, categories, colors, colLabel }: SectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="mb-5">
        <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Table */}
        <div className="flex-1 min-w-0 w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-3 font-semibold text-gray-500 w-8">No</th>
                  <th className="text-left py-2 pr-3 font-semibold text-gray-500">{colLabel}</th>
                  <th className="text-right py-2 pr-3 font-semibold text-gray-500 whitespace-nowrap">Total</th>
                  <th className="text-right py-2 font-semibold text-gray-500">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {categories.map((cat, i) => (
                  <tr key={cat.category_id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-2.5 pr-3 text-gray-400">{i + 1}</td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: colors[i % colors.length] }}
                        />
                        <span className="text-gray-700 font-medium">{cat.category_name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 text-right text-gray-700 tabular-nums whitespace-nowrap">
                      {formatRupiah(cat.total_amount)}
                    </td>
                    <td className="py-2.5 text-right font-semibold tabular-nums whitespace-nowrap"
                      style={{ color: colors[i % colors.length] }}>
                      {formatPct(cat.percentage)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-100">
                  <td colSpan={2} className="pt-3 text-xs font-bold text-gray-700">Total Keseluruhan</td>
                  <td className="pt-3 text-right text-xs font-bold text-gray-900 tabular-nums whitespace-nowrap pr-3">
                    {formatRupiah(total)}
                  </td>
                  <td className="pt-3 text-right text-xs font-bold text-gray-500">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="w-full lg:w-52 shrink-0">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categories}
                dataKey="total_amount"
                nameKey="category_name"
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={72}
                paddingAngle={2}
              >
                {categories.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="space-y-1.5 mt-1">
            {categories.map((cat, i) => (
              <div key={cat.category_id} className="flex items-center gap-2 text-[11px]">
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ background: colors[i % colors.length] }}
                />
                <span className="text-gray-600 truncate flex-1">{cat.category_name}</span>
                <span className="text-gray-400 tabular-nums shrink-0">{formatPct(cat.percentage)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────── */

interface Props {
  data: CategoryAllocationData | null;
  loading: boolean;
}

export default function CategoryAllocation({ data, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-[200px] w-full" />
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <AllocationSection
        title="Alokasi Pemasukan"
        subtitle="Sumber dana berdasarkan kategori"
        total={data.income.total}
        categories={data.income.categories}
        colors={INCOME_COLORS}
        colLabel="Kategori Pemasukan"
      />
      <AllocationSection
        title="Alokasi Pengeluaran"
        subtitle="Distribusi belanja berdasarkan kategori"
        total={data.expense.total}
        categories={data.expense.categories}
        colors={EXPENSE_COLORS}
        colLabel="Kategori Pengeluaran"
      />
    </div>
  );
}
