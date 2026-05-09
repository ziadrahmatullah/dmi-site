'use client'

import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, Beef, AlertCircle } from 'lucide-react'
import { fetchDashboardQurban } from '@/lib/api/dashboard'
import type { DashboardQurban, QurbanByAnimalType } from '@/types/dashboard'

// ── Animal color palette ───────────────────────────────────────────────────

const ANIMAL_COLORS = [
  '#16a34a', // hijau  — Domba / default pertama
  '#d97706', // emas   — Sapi
  '#0d9488', // teal   — Kambing
  '#f59e0b', // amber  — Kerbau
  '#6366f1', // indigo — lainnya
  '#ec4899', // pink
]

// ── Progress bar with entrance animation ──────────────────────────────────

function ProgressBar({
  percentage,
  color,
  delay = 0,
}: {
  percentage: number
  color: string
  delay?: number
}) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(percentage), 120 + delay)
    return () => clearTimeout(t)
  }, [percentage, delay])

  return (
    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, backgroundColor: color }}
      />
    </div>
  )
}

// ── Custom tooltip ─────────────────────────────────────────────────────────

interface TooltipEntry {
  name: string
  value: number
  payload: { percentage: number }
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
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs min-w-[130px]">
      <p className="font-semibold text-gray-800 mb-1">{item.name}</p>
      <p className="text-gray-600">
        {item.value.toLocaleString('id-ID')} ekor
      </p>
      <p className="text-gray-400 mt-0.5">
        {item.payload.percentage.toFixed(1)}%
      </p>
    </div>
  )
}

// ── Summary card ───────────────────────────────────────────────────────────

function SummaryCard({
  label,
  value,
  colorClass,
  bgClass,
  icon: Icon,
}: {
  label: string
  value: number
  colorClass: string
  bgClass: string
  icon: React.ElementType
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start justify-between gap-3">
      <div>
        <p className="text-xs text-gray-400 font-medium mb-1.5">{label}</p>
        <p className={`text-3xl font-bold ${colorClass}`}>
          {value.toLocaleString('id-ID')}
        </p>
      </div>
      <div
        className={`w-11 h-11 rounded-xl ${bgClass} flex items-center justify-center shrink-0`}
      >
        <Icon size={22} className={colorClass} />
      </div>
    </div>
  )
}

// ── Skeleton ───────────────────────────────────────────────────────────────

function QurbanSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-5"
          >
            <div className="skeleton h-3 w-32 rounded mb-3" />
            <div className="skeleton h-8 w-20 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {/* Donut skeleton */}
        <div className="flex flex-col items-center justify-center gap-6">
          <div
            className="skeleton rounded-full"
            style={{ width: 180, height: 180 }}
          />
          <div className="w-full space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between gap-2">
                <div className="skeleton h-3 w-20 rounded" />
                <div className="skeleton h-3 w-10 rounded" />
              </div>
            ))}
          </div>
        </div>
        {/* Progress skeleton */}
        <div className="space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <div className="skeleton h-3 w-20 rounded" />
                <div className="skeleton h-3 w-16 rounded" />
              </div>
              <div className="skeleton h-2.5 rounded-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────

interface ChartItem {
  name: string
  value: number
  percentage: number
}

function toChartItems(items: QurbanByAnimalType[]): ChartItem[] {
  return [...items]
    .sort((a, b) => b.total_quantity - a.total_quantity)
    .map((item) => ({
      name: item.animal_type_name,
      value: item.total_quantity,
      percentage: item.percentage,
    }))
}

const YEARS = [2024, 2025, 2026]

// ── Component ──────────────────────────────────────────────────────────────

export default function DashboardQurban() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [data, setData] = useState<DashboardQurban | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetchDashboardQurban({ year })
      .then((res) => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [year])

  const chartItems = data ? toChartItems(data.qurban_by_animal_type ?? []) : []

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-dmi-gold/10 text-dmi-gold border-dmi-gold/20 mb-2">
              Program Qurban
            </span>
            <h2
              className="text-2xl lg:text-3xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-heading), serif' }}
            >
              Rekapitulasi Qurban
            </h2>
          </div>

          {/* Year selector */}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-dmi-green cursor-pointer self-start sm:self-auto"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* ── Body ── */}
        {loading || !mounted ? (
          <QurbanSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center py-16 text-center">
            <AlertCircle size={40} className="text-red-400 mb-3" />
            <p className="text-gray-600 font-semibold mb-1">
              Gagal memuat data qurban
            </p>
            <p className="text-gray-400 text-sm">
              Silakan coba beberapa saat lagi.
            </p>
          </div>
        ) : data ? (
          <>
            {/* ── Summary cards ── */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <SummaryCard
                label="Total Pendaftar Qurban"
                value={data.total_qurban}
                colorClass="text-dmi-green"
                bgClass="bg-green-50"
                icon={Users}
              />
              <SummaryCard
                label="Total Hewan Qurban"
                value={data.total_quantity}
                colorClass="text-dmi-gold"
                bgClass="bg-amber-50"
                icon={Beef}
              />
            </div>

            {/* ── Visualization ── */}
            {chartItems.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center text-center">
                <Beef size={40} className="text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">
                  Belum ada data hewan qurban untuk tahun {year}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
                <h3
                  className="text-base font-bold text-gray-800 mb-6"
                  style={{ fontFamily: 'var(--font-heading), serif' }}
                >
                  Distribusi Jenis Hewan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* ── Left: Donut chart ── */}
                  <div>
                    <div className="relative" style={{ height: '220px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartItems}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={2}
                            dataKey="value"
                            isAnimationActive
                          >
                            {chartItems.map((_, i) => (
                              <Cell
                                key={`cell-${i}`}
                                fill={ANIMAL_COLORS[i % ANIMAL_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Center label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                        <span className="text-2xl font-bold text-gray-900 leading-none">
                          {data.total_quantity.toLocaleString('id-ID')}
                        </span>
                        <span className="text-xs text-gray-400 mt-1.5 font-medium">
                          Ekor
                        </span>
                      </div>
                    </div>

                    {/* Chart legend */}
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 justify-center">
                      {chartItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{
                              backgroundColor:
                                ANIMAL_COLORS[i % ANIMAL_COLORS.length],
                            }}
                          />
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Right: Progress bar list ── */}
                  <div className="space-y-5">
                    {chartItems.map((item, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{
                                backgroundColor:
                                  ANIMAL_COLORS[i % ANIMAL_COLORS.length],
                              }}
                            />
                            <span className="text-sm font-semibold text-gray-800">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="font-bold text-gray-700">
                              {item.value.toLocaleString('id-ID')} ekor
                            </span>
                            <span className="text-gray-400 font-medium min-w-[38px] text-right">
                              {item.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <ProgressBar
                          percentage={item.percentage}
                          color={ANIMAL_COLORS[i % ANIMAL_COLORS.length]}
                          delay={i * 100}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </section>
  )
}
