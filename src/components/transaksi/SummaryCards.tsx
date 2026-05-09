"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { TrendingUp, TrendingDown, ArrowRightLeft } from "lucide-react";

interface SummaryCardsProps {
  total_income: number;
  total_expense: number;
  total_net: number;
  loading: boolean;
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface CardItemProps {
  label: string;
  value: number;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  loading: boolean;
}

function CardItem({ label, value, color, bgColor, icon, loading }: CardItemProps) {
  return (
    <div className="flex items-center gap-4 flex-1 min-w-0">
      <div className={`w-10 h-10 ${bgColor} rounded-xl flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
        {loading ? (
          <Skeleton className="h-6 w-32" />
        ) : (
          <p className={`text-lg font-bold ${color} truncate`}>
            {formatRupiah(value)}
          </p>
        )}
      </div>
    </div>
  );
}

export default function SummaryCards({
  total_income,
  total_expense,
  total_net,
  loading,
}: SummaryCardsProps) {
  const isNetPositive = total_net >= 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 p-5">
          <CardItem
            label="Total Pemasukan"
            value={total_income}
            color="text-green-600"
            bgColor="bg-green-50"
            icon={<TrendingUp size={18} className="text-green-600" />}
            loading={loading}
          />
        </div>

        <div className="w-px bg-gray-100 hidden sm:block" />
        <div className="h-px bg-gray-100 sm:hidden" />

        <div className="flex-1 p-5">
          <CardItem
            label="Total Pengeluaran"
            value={total_expense}
            color="text-rose-600"
            bgColor="bg-rose-50"
            icon={<TrendingDown size={18} className="text-rose-600" />}
            loading={loading}
          />
        </div>

        <div className="w-px bg-gray-100 hidden sm:block" />
        <div className="h-px bg-gray-100 sm:hidden" />

        <div className="flex-1 p-5">
          <CardItem
            label="Selisih"
            value={Math.abs(total_net)}
            color={isNetPositive ? "text-green-600" : "text-rose-600"}
            bgColor={isNetPositive ? "bg-green-50" : "bg-rose-50"}
            icon={
              <ArrowRightLeft
                size={18}
                className={isNetPositive ? "text-green-600" : "text-rose-600"}
              />
            }
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
