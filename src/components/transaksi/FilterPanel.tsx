"use client";

import { useEffect, useRef, useState } from "react";
import { fetchCategories, fetchDistricts, fetchMosques } from "@/lib/api/transaksi";
import type { Category, District, Mosque, FilterState } from "@/types/transaksi";
import { X, Search, SlidersHorizontal } from "lucide-react";

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  onCategoryTypeChange: (type: CategoryTypeFilter) => void;
}

type CategoryTypeFilter = "all" | "pemasukan" | "pengeluaran";

function getDefaultDates() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const lastDay = new Date(y, now.getMonth() + 1, 0).getDate();
  return {
    start: `${y}-${m}-01`,
    end: `${y}-${m}-${String(lastDay).padStart(2, "0")}`,
  };
}

const defaults = getDefaultDates();

const INITIAL_FILTERS: FilterState = {
  search: "",
  category_id: undefined,
  district_id: undefined,
  mosque_id: undefined,
  start_date: defaults.start,
  end_date: defaults.end,
};

const labelClass = "block text-xs font-medium text-gray-500 mb-1.5";
const inputClass =
  "w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dmi-green/25 focus:border-dmi-green transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed";

export default function FilterPanel({ onFilterChange, onCategoryTypeChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [searchInput, setSearchInput] = useState("");
  const [categoryTypeFilter, setCategoryTypeFilter] = useState<CategoryTypeFilter>("all");

  const [categories, setCategories] = useState<Category[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loadingMosques, setLoadingMosques] = useState(false);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchCategories().then((r) => setCategories(r.data)).catch(console.error);
    fetchDistricts().then((r) => setDistricts(r.data)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!filters.district_id) {
      setMosques([]);
      return;
    }
    setLoadingMosques(true);
    fetchMosques(filters.district_id)
      .then((r) => setMosques(r.data))
      .catch(console.error)
      .finally(() => setLoadingMosques(false));
  }, [filters.district_id]);

  const emit = (updated: FilterState) => {
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleSearch = (val: string) => {
    setSearchInput(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      emit({ ...filters, search: val });
    }, 400);
  };

  // Memilih kategori → reset category_type ke "all"
  const handleCategory = (val: string) => {
    const id = val ? Number(val) : undefined;
    setCategoryTypeFilter("all");
    emit({ ...filters, category_id: id });
  };

  // Memilih category_type → filter client-side di parent, reset category_id
  const handleCategoryType = (type: CategoryTypeFilter) => {
    setCategoryTypeFilter(type);
    onCategoryTypeChange(type);
    emit({ ...filters, category_id: undefined });
  };

  const handleDistrict = (val: string) => {
    const id = val ? Number(val) : undefined;
    emit({ ...filters, district_id: id, mosque_id: undefined });
  };

  const handleMosque = (val: string) => {
    const id = val ? Number(val) : undefined;
    emit({ ...filters, mosque_id: id });
  };

  const handleReset = () => {
    setSearchInput("");
    setCategoryTypeFilter("all");
    onCategoryTypeChange("all");
    setMosques([]);
    emit(INITIAL_FILTERS);
  };

  const filteredCategories =
    categoryTypeFilter === "all"
      ? categories
      : categories.filter((c) => c.category_type === categoryTypeFilter);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
          <SlidersHorizontal size={14} className="text-dmi-green" />
          Filter Transaksi
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-red-50 font-medium"
        >
          <X size={12} />
          Reset
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Row 1: Search | Kategori | Tipe Kategori */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Pencarian</label>
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Cari deskripsi..."
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Kategori</label>
            <select
              value={filters.category_id ?? ""}
              onChange={(e) => handleCategory(e.target.value)}
              className={inputClass}
            >
              <option value="">Semua Kategori</option>
              {filteredCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Tipe Kategori</label>
            <select
              value={categoryTypeFilter}
              onChange={(e) => handleCategoryType(e.target.value as CategoryTypeFilter)}
              className={inputClass}
            >
              <option value="all">Semua Tipe</option>
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
          </div>
        </div>

        {/* Row 2: Tanggal Mulai | Tanggal Akhir | Kecamatan | Masjid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>Tanggal Mulai</label>
            <input
              type="date"
              value={filters.start_date}
              onChange={(e) => emit({ ...filters, start_date: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Tanggal Akhir</label>
            <input
              type="date"
              value={filters.end_date}
              onChange={(e) => emit({ ...filters, end_date: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Kecamatan</label>
            <select
              value={filters.district_id ?? ""}
              onChange={(e) => handleDistrict(e.target.value)}
              className={inputClass}
            >
              <option value="">Semua Kecamatan</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Masjid</label>
            <select
              value={filters.mosque_id ?? ""}
              onChange={(e) => handleMosque(e.target.value)}
              disabled={!filters.district_id || loadingMosques}
              className={inputClass}
            >
              <option value="">
                {!filters.district_id
                  ? "Pilih kecamatan dulu"
                  : loadingMosques
                  ? "Memuat masjid..."
                  : "Semua Masjid"}
              </option>
              {mosques.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
