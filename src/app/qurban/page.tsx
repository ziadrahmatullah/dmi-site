"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchQurbans, downloadQurbans } from "@/lib/api/qurban";
import type { Qurban, QurbanFilterState, QurbanMeta } from "@/types/qurban";
import QurbanFilterPanel from "@/components/qurban/QurbanFilterPanel";
import QurbanTable from "@/components/qurban/QurbanTable";
import { Download } from "lucide-react";

function getDefaultFilters(): QurbanFilterState {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const lastDay = new Date(y, now.getMonth() + 1, 0).getDate();
  return {
    search: "",
    animal_type_id: undefined,
    district_id: undefined,
    mosque_id: undefined,
    start_date: `${y}-${m}-01`,
    end_date: `${y}-${m}-${String(lastDay).padStart(2, "0")}`,
  };
}

const DEFAULT_META: QurbanMeta = {
  current_page: 1,
  current_item: 0,
  total_page: 1,
  total_item: 0,
};

export default function QurbanPage() {
  const [filters, setFilters] = useState<QurbanFilterState>(getDefaultFilters());
  const [currentPage, setCurrentPage] = useState(1);

  const [qurbans, setQurbans] = useState<Qurban[]>([]);
  const [meta, setMeta] = useState<QurbanMeta>(DEFAULT_META);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const loadQurbans = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchQurbans({
        page: currentPage,
        limit: 10,
        search: filters.search,
        animal_type_id: filters.animal_type_id,
        district_id: filters.district_id,
        mosque_id: filters.mosque_id,
        start_date: filters.start_date,
        end_date: filters.end_date,
      });
      setQurbans(res.data);
      setMeta(res.meta);
    } catch (err) {
      console.error("fetchQurbans error:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => { loadQurbans(); }, [loadQurbans]);

  const handleFilterChange = (newFilters: QurbanFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const blob = await downloadQurbans({
        search: filters.search,
        animal_type_id: filters.animal_type_id,
        district_id: filters.district_id,
        mosque_id: filters.mosque_id,
        start_date: filters.start_date,
        end_date: filters.end_date,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qurban-${filters.start_date}-${filters.end_date}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("downloadQurbans error:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #15803d 0%, #14532d 100%)",
          minHeight: "200px",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          aria-hidden="true"
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="geo-qurban"
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
            <rect width="100%" height="100%" fill="url(#geo-qurban)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
          <p className="text-amber-400 font-bold text-xs tracking-widest uppercase mb-2">
            IBADAH QURBAN
          </p>
          <h1
            className="text-3xl lg:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Daftar Qurban
          </h1>
          <p className="text-white/70 max-w-lg text-sm leading-relaxed">
            Pengelolaan dan pendataan hewan qurban dari seluruh masjid
            nusantara
          </p>
        </div>
      </section>

      {/* Action bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-2.5">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 h-9 px-4 rounded-lg border border-dmi-green text-dmi-green text-sm font-medium hover:bg-dmi-green/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Download size={15} />
            {downloading ? "Mengunduh..." : "Download"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        <QurbanFilterPanel onFilterChange={handleFilterChange} />
        <QurbanTable
          qurbans={qurbans}
          meta={meta}
          loading={loading}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
