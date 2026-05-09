"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import {
  fetchTransactions,
  fetchTransactionTrend,
  downloadTransaksi,
} from "@/lib/api/transaksi";
import type {
  FilterState,
  Meta,
  Transaction,
  TrendItem,
} from "@/types/transaksi";
import FilterPanel from "./FilterPanel";
import SummaryCards from "./SummaryCards";
import TrendChart from "./TrendChart";
import TransaksiTable from "./TransaksiTable";

type CategoryTypeFilter = "all" | "pemasukan" | "pengeluaran";

function getDefaultFilters(): FilterState {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const lastDay = new Date(y, now.getMonth() + 1, 0).getDate();
  return {
    search: "",
    category_id: undefined,
    district_id: undefined,
    mosque_id: undefined,
    start_date: `${y}-${m}-01`,
    end_date: `${y}-${m}-${String(lastDay).padStart(2, "0")}`,
  };
}

const DEFAULT_META: Meta = {
  current_page: 1,
  current_item: 0,
  total_page: 1,
  total_item: 0,
};

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #15803d 0%, #14532d 100%)",
        minHeight: "200px",
      }}
    >
      {/* Islamic geometric SVG */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="geo-transaksi"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="40,0 80,20 80,60 40,80 0,60 0,20"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
              <polygon
                points="40,12 68,26 68,54 40,68 12,54 12,26"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
              <line x1="40" y1="0" x2="40" y2="80" stroke="white" strokeWidth="0.4" />
              <line x1="0" y1="40" x2="80" y2="40" stroke="white" strokeWidth="0.4" />
              <circle cx="40" cy="40" r="6" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo-transaksi)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        <p className="text-amber-400 font-bold text-xs tracking-widest uppercase mb-2">
          KEUANGAN MASJID
        </p>
        <h1
          className="text-3xl lg:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-heading), serif" }}
        >
          Laporan Transaksi
        </h1>
        <p className="text-white/70 max-w-lg text-sm leading-relaxed">
          Transparansi keuangan masjid-masjid di bawah naungan Dewan Masjid
          Indonesia
        </p>
      </div>
    </section>
  );
}

export default function TransaksiDashboard() {
  const now = new Date();

  const [filters, setFilters] = useState<FilterState>(getDefaultFilters());
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryType, setCategoryType] = useState<CategoryTypeFilter>("all");

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [meta, setMeta] = useState<Meta>(DEFAULT_META);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalNet, setTotalNet] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [trendData, setTrendData] = useState<TrendItem[]>([]);
  const [trendFilter, setTrendFilter] = useState<"ytd" | "mtd">("mtd");
  const [trendYear, setTrendYear] = useState(now.getFullYear());
  const [trendMonth, setTrendMonth] = useState(now.getMonth() + 1);
  const [trendLoading, setTrendLoading] = useState(false);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchTransactions({
        page: currentPage,
        limit: 10,
        search: filters.search,
        category_id: filters.category_id,
        district_id: filters.district_id,
        mosque_id: filters.mosque_id,
        start_date: filters.start_date,
        end_date: filters.end_date,
      });
      setTransactions(res.data.data);
      setMeta(res.data.meta);
      setTotalIncome(res.data.total_income);
      setTotalExpense(res.data.total_expense);
      setTotalNet(res.data.total_net);
    } catch (err) {
      console.error("fetchTransactions error:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  const loadTrend = useCallback(async () => {
    setTrendLoading(true);
    try {
      const res = await fetchTransactionTrend({
        filter: trendFilter,
        year: trendYear,
        month: trendMonth,
        category_id: filters.category_id,
        district_id: filters.district_id,
        mosque_id: filters.mosque_id,
      });
      setTrendData(res.data.data);
    } catch (err) {
      console.error("fetchTrend error:", err);
    } finally {
      setTrendLoading(false);
    }
  }, [
    trendFilter,
    trendYear,
    trendMonth,
    filters.category_id,
    filters.district_id,
    filters.mosque_id,
  ]);

  useEffect(() => { loadTransactions(); }, [loadTransactions]);
  useEffect(() => { loadTrend(); }, [loadTrend]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleCategoryTypeChange = (type: CategoryTypeFilter) => {
    setCategoryType(type);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTrendFilterChange = (
    f: "ytd" | "mtd",
    y: number,
    mo: number
  ) => {
    setTrendFilter(f);
    setTrendYear(y);
    setTrendMonth(mo);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await downloadTransaksi(filters);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `transaksi-${filters.start_date}-${filters.end_date}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Gagal mengunduh data");
    } finally {
      setIsDownloading(false);
    }
  };

  // Client-side filter by category type (summary cards use unfiltered API totals)
  const displayedTransactions: Transaction[] =
    categoryType === "all"
      ? transactions
      : transactions.filter((t) => t.category_type === categoryType);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ── Hero ── */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Download button */}
        <div className="flex justify-end">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 h-9 px-4 rounded-lg border border-dmi-green text-dmi-green text-sm font-medium hover:bg-dmi-green/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isDownloading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Download size={15} />
            )}
            {isDownloading ? "Downloading..." : "Download"}
          </button>
        </div>

        {/* Filter — category_type stays client-side, not sent to API */}
        <FilterPanel
          onFilterChange={handleFilterChange}
          onCategoryTypeChange={handleCategoryTypeChange}
        />

        {/* Summary cards use raw API totals (not client-filtered) */}
        <SummaryCards
          total_income={totalIncome}
          total_expense={totalExpense}
          total_net={totalNet}
          loading={loading}
        />

        {/* Trend Chart */}
        <TrendChart
          trendData={trendData}
          filter={trendFilter}
          year={trendYear}
          month={trendMonth}
          loading={trendLoading}
          onFilterChange={handleTrendFilterChange}
        />

        {/* Table uses client-filtered transactions */}
        <TransaksiTable
          transactions={displayedTransactions}
          meta={meta}
          loading={loading}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
