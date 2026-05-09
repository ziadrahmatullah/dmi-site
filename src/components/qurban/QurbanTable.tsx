"use client";

import type { Qurban, QurbanMeta } from "@/types/qurban";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight, InboxIcon } from "lucide-react";

interface QurbanTableProps {
  qurbans: Qurban[];
  meta: QurbanMeta;
  loading: boolean;
  onPageChange: (page: number) => void;
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-4 w-full rounded" />
        </td>
      ))}
    </tr>
  );
}

function Pagination({ meta, onPageChange }: { meta: QurbanMeta; onPageChange: (p: number) => void }) {
  const { current_page, total_page } = meta;
  if (total_page <= 1) return null;

  const pages: (number | "...")[] = [];
  if (total_page <= 7) {
    for (let i = 1; i <= total_page; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current_page > 3) pages.push("...");
    for (let i = Math.max(2, current_page - 1); i <= Math.min(total_page - 1, current_page + 1); i++) {
      pages.push(i);
    }
    if (current_page < total_page - 2) pages.push("...");
    pages.push(total_page);
  }

  const btnBase = "h-8 min-w-[32px] px-2 rounded-lg text-sm font-medium border transition-all duration-150 cursor-pointer";
  const active = `${btnBase} bg-gray-900 text-white border-gray-900`;
  const inactive = `${btnBase} bg-white text-gray-700 border-gray-200 hover:bg-gray-50`;
  const navBtn = `${btnBase} bg-white text-gray-700 border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed`;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
      <p className="text-xs text-gray-500">
        Menampilkan halaman {current_page} dari {total_page}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
          className={navBtn}
        >
          <ChevronLeft size={14} />
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dot-${i}`} className="px-1 text-gray-400 text-sm">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={current_page === p ? active : inactive}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === total_page}
          className={navBtn}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function QurbanTable({ qurbans, meta, loading, onPageChange }: QurbanTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-sm">Daftar Qurban</h3>
        {!loading && (
          <span className="text-xs text-gray-400">{meta.total_item} data</span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Tanggal", "Nama", "Masjid", "Jenis Hewan", "Qty", "Aksi"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
            ) : qurbans.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                      <InboxIcon size={24} className="text-gray-400" />
                    </div>
                    <p className="font-medium text-gray-600 text-sm">Belum ada data qurban</p>
                    <p className="text-xs text-gray-400">Coba ubah filter untuk melihat data</p>
                  </div>
                </td>
              </tr>
            ) : (
              qurbans.map((q) => (
                <tr
                  key={q.id}
                  className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-xs">
                    {formatDate(q.qurban_date)}
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-medium max-w-[160px]">
                    <span className="line-clamp-1">{q.name}</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p className="text-gray-800 font-medium leading-snug">{q.mosque?.name ?? "-"}</p>
                    {q.mosque?.district?.name && (
                      <p className="text-gray-400 mt-0.5">{q.mosque.district.name}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {q.animal_type?.name ?? "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-semibold text-sm whitespace-nowrap">
                    {q.quantity}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => console.log("view", q.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Lihat detail"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => console.log("edit", q.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-dmi-gold hover:bg-amber-50 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => console.log("delete", q.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination meta={meta} onPageChange={onPageChange} />
    </div>
  );
}
