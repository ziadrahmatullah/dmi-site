"use client";

import { useEffect, useRef, useState } from "react";
import { fetchAnimalTypes, fetchQurbanDistricts, fetchQurbanMosques } from "@/lib/api/qurban";
import type { AnimalType, QurbanDistrict, QurbanMosque, QurbanFilterState } from "@/types/qurban";
import { X, Search, SlidersHorizontal } from "lucide-react";

interface QurbanFilterPanelProps {
  onFilterChange: (filters: QurbanFilterState) => void;
}

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

const INITIAL_FILTERS: QurbanFilterState = {
  search: "",
  animal_type_id: undefined,
  district_id: undefined,
  mosque_id: undefined,
  start_date: defaults.start,
  end_date: defaults.end,
};

const labelClass = "block text-xs font-medium text-gray-500 mb-1.5";
const inputClass =
  "w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dmi-green/25 focus:border-dmi-green transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed";

export default function QurbanFilterPanel({ onFilterChange }: QurbanFilterPanelProps) {
  const [filters, setFilters] = useState<QurbanFilterState>(INITIAL_FILTERS);
  const [searchInput, setSearchInput] = useState("");

  const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
  const [districts, setDistricts] = useState<QurbanDistrict[]>([]);
  const [mosques, setMosques] = useState<QurbanMosque[]>([]);
  const [loadingMosques, setLoadingMosques] = useState(false);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchAnimalTypes().then((r) => setAnimalTypes(r.data)).catch(console.error);
    fetchQurbanDistricts().then((r) => setDistricts(r.data)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!filters.district_id) {
      setMosques([]);
      return;
    }
    setLoadingMosques(true);
    fetchQurbanMosques(filters.district_id)
      .then((r) => setMosques(r.data))
      .catch(console.error)
      .finally(() => setLoadingMosques(false));
  }, [filters.district_id]);

  const emit = (updated: QurbanFilterState) => {
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

  const handleAnimalType = (val: string) => {
    const id = val ? Number(val) : undefined;
    emit({ ...filters, animal_type_id: id });
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
    setMosques([]);
    emit(INITIAL_FILTERS);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
          <SlidersHorizontal size={14} className="text-dmi-green" />
          Filters
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
        {/* Row 1: Search | Animal Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Pencarian</label>
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Cari nama..."
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Jenis Hewan</label>
            <select
              value={filters.animal_type_id ?? ""}
              onChange={(e) => handleAnimalType(e.target.value)}
              className={inputClass}
            >
              <option value="">Semua Jenis</option>
              {animalTypes.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Start Date | End Date | District | Mosque */}
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
