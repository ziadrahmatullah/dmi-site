'use client'

import { useState, useEffect } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Wallet,
  AlertCircle,
} from 'lucide-react'
import { fetchDashboardTransaction } from '@/lib/api/dashboard'
import type { DashboardTransaction, DistrictAmount } from '@/types/dashboard'

// ── Utilities ──────────────────────────────────────────────────────────────

function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatShort(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}m`
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}jt`
  if (abs >= 1_000) return `${(value / 1_000).toFixed(0)}rb`
  return String(value)
}

// ── Color palettes ─────────────────────────────────────────────────────────

const GREEN_PALETTE = [
  '#15803d', '#22c55e', '#4ade80', '#d97706',
  '#0d9488', '#84cc16', '#10b981',
]
const RED_PALETTE = [
  '#e11d48', '#f97316', '#f59e0b', '#ef4444',
  '#c2410c', '#b45309', '#dc2626',
]

// ── Internal types ─────────────────────────────────────────────────────────

interface ChartDataItem {
  name: string
  value: number
  percentage: number
}

// ── Helpers ────────────────────────────────────────────────────────────────

function consolidateDistricts(
  items: DistrictAmount[],
  maxItems = 5
): ChartDataItem[] {
  if (!items || items.length === 0) return []
  if (items.length <= maxItems) {
    return items.map((d) => ({
      name: d.district_name,
      value: d.amount,
      percentage: d.percentage,
    }))
  }
  const top = items.slice(0, maxItems)
  const rest = items.slice(maxItems)
  const restValue = rest.reduce((s, d) => s + d.amount, 0)
  const restPct = rest.reduce((s, d) => s + d.percentage, 0)
  return [
    ...top.map((d) => ({
      name: d.district_name,
      value: d.amount,
      percentage: d.percentage,
    })),
    { name: 'Lainnya', value: restValue, percentage: restPct },
  ]
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────

interface TooltipEntry {
  name: string
  value: number
  payload: ChartDataItem
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: TooltipEntry[]
}) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs min-w-[140px]">
      <p className="font-semibold text-gray-800 mb-1 truncate">{item.name}</p>
      <p className="text-gray-600">{formatRupiah(item.value)}</p>
      <p className="text-gray-400 mt-0.5">{item.payload.percentage.toFixed(1)}%</p>
    </div>
  )
}

// ── Donut Chart Card ───────────────────────────────────────────────────────

function DonutChartCard({
  title,
  data,
  colors,
  centerLabel,
  centerSublabel,
}: {
  title: string
  data: ChartDataItem[]
  colors: string[]
  centerLabel: string
  centerSublabel: string
}) {
  const isEmpty = data.length === 0 || data.every((d) => d.value === 0)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
      <h4 className="text-sm font-bold text-gray-700 mb-4 text-center tracking-wide">
        {title}
      </h4>

      {/* Donut */}
      <div className="relative" style={{ height: '190px' }}>
        {isEmpty ? (
          <div className="flex items-center justify-center h-full text-gray-300 text-sm">
            Tidak ada data
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                  isAnimationActive
                >
                  {data.map((_, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={colors[i % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label — overlaid absolutely */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
              <span className="text-lg font-bold text-gray-900 leading-none">
                {centerLabel}
              </span>
              <span className="text-[11px] text-gray-400 mt-1">
                {centerSublabel}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      {!isEmpty && (
        <div className="mt-4 space-y-2 flex-1">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: colors[i % colors.length] }}
                />
                <span className="text-gray-600 truncate">{item.name}</span>
              </div>
              <span className="text-gray-400 shrink-0 font-medium">
                {item.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Summary Card ───────────────────────────────────────────────────────────

function SummaryCard({
  label,
  value,
  colorClass,
  bgClass,
  icon: Icon,
  isRupiah = false,
}: {
  label: string
  value: number
  colorClass: string
  bgClass: string
  icon: React.ElementType
  isRupiah?: boolean
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs text-gray-400 font-medium mb-1.5 truncate">{label}</p>
        <p className={`font-bold leading-tight ${colorClass} ${isRupiah ? 'text-base' : 'text-2xl'}`}>
          {isRupiah ? formatRupiah(value) : value.toLocaleString('id-ID')}
        </p>
      </div>
      <div className={`w-10 h-10 rounded-xl ${bgClass} flex items-center justify-center shrink-0`}>
        <Icon size={20} className={colorClass} />
      </div>
    </div>
  )
}

// ── Skeleton ───────────────────────────────────────────────────────────────

function TransaksiSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="skeleton h-3 w-24 rounded mb-3" />
            <div className="skeleton h-7 w-32 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="skeleton h-4 w-40 rounded mx-auto mb-6" />
            <div className="skeleton rounded-full mx-auto" style={{ width: 170, height: 170 }} />
            <div className="mt-5 space-y-2.5">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex justify-between gap-2">
                  <div className="skeleton h-3 w-24 rounded" />
                  <div className="skeleton h-3 w-12 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Month names ────────────────────────────────────────────────────────────

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]
const YEARS = [2024, 2025, 2026]

// ── Component ──────────────────────────────────────────────────────────────

export default function DashboardTransaksi() {
  const now = new Date()
  const [filter, setFilter] = useState<'ytd' | 'mtd'>('mtd')
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [data, setData] = useState<DashboardTransaction | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetchDashboardTransaction({
      filter,
      year,
      month: filter === 'mtd' ? month : undefined,
    })
      .then((res) => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [filter, year, month])

  // Prepared chart data (computed only when data is ready)
  const chart1Data: ChartDataItem[] = data
    ? (() => {
        const inc = data.income_vs_expense.total_income
        const exp = data.income_vs_expense.total_expense
        const total = inc + exp
        return [
          {
            name: 'Pemasukan',
            value: inc,
            percentage: total > 0 ? (inc / total) * 100 : 0,
          },
          {
            name: 'Pengeluaran',
            value: exp,
            percentage: total > 0 ? (exp / total) * 100 : 0,
          },
        ]
      })()
    : []

  const chart2Data = data
    ? consolidateDistricts(data.income_by_district)
    : []
  const chart3Data = data
    ? consolidateDistricts(data.expense_by_district)
    : []

  const incomePercent =
    data && data.income_vs_expense.total_income + data.income_vs_expense.total_expense > 0
      ? Math.round(
          (data.income_vs_expense.total_income /
            (data.income_vs_expense.total_income +
              data.income_vs_expense.total_expense)) *
            100
        )
      : 0

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-dmi-green/10 text-dmi-green border-dmi-green/20 mb-2">
              Data Real-Time
            </span>
            <h2
              className="text-2xl lg:text-3xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-heading), serif' }}
            >
              Ringkasan Keuangan
            </h2>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* YTD / MTD toggle pill */}
            <div className="flex rounded-full bg-gray-100 p-1 gap-0.5">
              {(['ytd', 'mtd'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filter === f
                      ? 'bg-dmi-green text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Year */}
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-dmi-green cursor-pointer"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            {/* Month — only when MTD */}
            {filter === 'mtd' && (
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-dmi-green cursor-pointer"
              >
                {MONTHS.map((m, i) => (
                  <option key={i + 1} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        {loading || !mounted ? (
          <TransaksiSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center py-16 text-center">
            <AlertCircle size={40} className="text-red-400 mb-3" />
            <p className="text-gray-600 font-semibold mb-1">Gagal memuat data keuangan</p>
            <p className="text-gray-400 text-sm">Silakan coba beberapa saat lagi.</p>
          </div>
        ) : data ? (
          <>
            {/* ── Summary cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <SummaryCard
                label="Total Transaksi"
                value={data.total_transactions}
                colorClass="text-gray-800"
                bgClass="bg-gray-100"
                icon={FileText}
              />
              <SummaryCard
                label="Total Pemasukan"
                value={data.total_income}
                colorClass="text-green-600"
                bgClass="bg-green-50"
                icon={TrendingUp}
                isRupiah
              />
              <SummaryCard
                label="Total Pengeluaran"
                value={data.total_expense}
                colorClass="text-red-500"
                bgClass="bg-red-50"
                icon={TrendingDown}
                isRupiah
              />
              <SummaryCard
                label="Selisih Bersih"
                value={data.total_net}
                colorClass={data.total_net >= 0 ? 'text-green-600' : 'text-red-500'}
                bgClass={data.total_net >= 0 ? 'bg-green-50' : 'bg-red-50'}
                icon={Wallet}
                isRupiah
              />
            </div>

            {/* ── Three donut charts ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DonutChartCard
                title="Komposisi Keuangan"
                data={chart1Data}
                colors={['#16a34a', '#e11d48']}
                centerLabel={`${incomePercent}%`}
                centerSublabel="Pemasukan"
              />
              <DonutChartCard
                title="Pemasukan per Wilayah"
                data={chart2Data}
                colors={GREEN_PALETTE}
                centerLabel={formatShort(data.total_income)}
                centerSublabel="Total Masuk"
              />
              <DonutChartCard
                title="Pengeluaran per Wilayah"
                data={chart3Data}
                colors={RED_PALETTE}
                centerLabel={formatShort(data.total_expense)}
                centerSublabel="Total Keluar"
              />
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
