'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { fetchArticles } from '@/lib/api/artikel'
import type { Article } from '@/types/artikel'
import ArticleCard from '@/components/artikel/ArticleCard'
import FeaturedArticle from '@/components/artikel/FeaturedArticle'

interface Meta {
  current_page: number
  current_item: number
  total_page: number
  total_item: number
}

function FeaturedSkeleton() {
  return (
    <div className="mb-12 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="flex flex-col lg:flex-row">
        <div className="skeleton lg:w-[60%] h-72 lg:h-80" />
        <div className="lg:w-[40%] p-10 space-y-4">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-7 w-full rounded" />
          <div className="skeleton h-7 w-4/5 rounded" />
          <div className="skeleton h-4 w-full rounded mt-2" />
          <div className="skeleton h-4 w-4/5 rounded" />
          <div className="skeleton h-4 w-3/5 rounded" />
          <div className="skeleton h-10 w-44 rounded-full mt-4" />
        </div>
      </div>
    </div>
  )
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
        >
          <div className="skeleton w-full aspect-video" />
          <div className="p-5 space-y-3">
            <div className="skeleton h-3 w-28 rounded" />
            <div className="skeleton h-5 w-full rounded" />
            <div className="skeleton h-5 w-4/5 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ArtikelPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [meta, setMeta] = useState<Meta | null>(null)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounce search 400ms
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 400)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [search])

  // Fetch articles when search or page changes
  useEffect(() => {
    setLoading(true)
    fetchArticles({
      page: currentPage,
      limit: 9,
      search: debouncedSearch || undefined,
    })
      .then((res) => {
        setArticles(res.data)
        setMeta(res.meta)
      })
      .catch(() => {
        setArticles([])
        setMeta(null)
      })
      .finally(() => setLoading(false))
  }, [debouncedSearch, currentPage])

  const featured =
    currentPage === 1 && !debouncedSearch
      ? articles.find((a) => a.is_highlight)
      : undefined

  const totalPages = meta?.total_page ?? 1

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages: (number | '...')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }

    return (
      <div className="flex items-center justify-center gap-1 mt-12">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-dmi-green hover:text-dmi-green disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-gray-400 select-none">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page as number)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-dmi-green text-white shadow-sm'
                  : 'border border-gray-200 text-gray-600 hover:border-dmi-green hover:text-dmi-green'
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-dmi-green hover:text-dmi-green disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dmi-cream">
      {/* ── Hero ── */}
      <section
        className="relative pt-28 pb-24 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #14532d 0%, #15803d 55%, #166534 100%)',
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
                id="geo-artikel"
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
                <line
                  x1="40" y1="0" x2="40" y2="80"
                  stroke="white" strokeWidth="0.4"
                />
                <line
                  x1="0" y1="40" x2="80" y2="40"
                  stroke="white" strokeWidth="0.4"
                />
                <circle
                  cx="40" cy="40" r="6"
                  fill="none" stroke="white" strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo-artikel)" />
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-dmi-gold font-bold text-xs tracking-widest uppercase mb-4">
            Wawasan &amp; Inspirasi
          </p>
          <h1
            className="text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{
              fontFamily: 'var(--font-heading), serif',
            }}
          >
            Artikel &amp; Berita
          </h1>
          <p className="text-white/70 text-base mb-10 leading-relaxed">
            Wawasan, Inspirasi, dan Kabar Terkini dari Dewan Masjid Indonesia
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari artikel, berita, atau topik..."
              className="w-full py-4 rounded-full bg-white text-gray-800 text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-dmi-gold/40"
              style={{ paddingLeft: '52px', paddingRight: '24px' }}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <>
            <FeaturedSkeleton />
            <GridSkeleton />
          </>
        ) : articles.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-5">
              <FileText size={40} className="text-gray-300" />
            </div>
            <h3 className="font-bold text-gray-700 text-xl mb-2">
              Tidak ada artikel ditemukan
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Coba kata kunci lain atau hapus pencarian.
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="px-6 py-2.5 bg-dmi-green text-white text-sm font-semibold rounded-full hover:bg-dmi-green-dark transition-colors cursor-pointer"
              >
                Reset Pencarian
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ── Featured highlight ── */}
            {featured && <FeaturedArticle article={featured} />}

            {/* ── Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>

            {/* ── Pagination ── */}
            {renderPagination()}
          </>
        )}
      </div>
    </div>
  )
}
