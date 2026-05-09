'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchEvents, fetchGalleries } from '@/lib/api/gallery'
import type { Event, GalleryItem } from '@/types/gallery'
import EventFilter from '@/components/gallery/EventFilter'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import GalleryLightbox from '@/components/gallery/GalleryLightbox'

interface Meta {
  current_page: number
  current_item: number
  total_page: number
  total_item: number
}

export default function GalleryPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [eventsLoading, setEventsLoading] = useState(false)
  const [galleries, setGalleries] = useState<GalleryItem[]>([])
  const [meta, setMeta] = useState<Meta | null>(null)
  const [activeEventId, setActiveEventId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [eventSearch, setEventSearch] = useState('')
  const [debouncedEventSearch, setDebouncedEventSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const eventDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fetch events when event search changes
  useEffect(() => {
    if (eventDebounceRef.current) clearTimeout(eventDebounceRef.current)
    eventDebounceRef.current = setTimeout(() => {
      setDebouncedEventSearch(eventSearch)
    }, 400)
    return () => {
      if (eventDebounceRef.current) clearTimeout(eventDebounceRef.current)
    }
  }, [eventSearch])

  useEffect(() => {
    setEventsLoading(true)
    setActiveEventId(null)
    fetchEvents(debouncedEventSearch)
      .then((res) => setEvents(res.data))
      .catch(() => {})
      .finally(() => setEventsLoading(false))
  }, [debouncedEventSearch])

  // Debounce search input (400ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setCurrentPage(1)
    }, 400)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [searchQuery])

  // Fetch galleries when filters change
  useEffect(() => {
    setLoading(true)
    fetchGalleries({
      page: currentPage,
      limit: 12,
      search: debouncedSearch || undefined,
      event_id: activeEventId ?? undefined,
    })
      .then((res) => {
        setGalleries(res.data)
        setMeta(res.meta)
      })
      .catch(() => {
        setGalleries([])
        setMeta(null)
      })
      .finally(() => setLoading(false))
  }, [activeEventId, debouncedSearch, currentPage])

  const handleEventSelect = (id: number | null) => {
    setActiveEventId(id)
    setCurrentPage(1)
  }

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
      <div className="flex items-center justify-center gap-1 mt-10">
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
                  ? 'bg-gray-900 text-white'
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
        className="relative pt-28 pb-16 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #14532d 0%, #15803d 60%, #166534 100%)',
        }}
      >
        {/* Islamic geometric pattern */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          aria-hidden="true"
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="geo-gallery"
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
                  x1="40"
                  y1="0"
                  x2="40"
                  y2="80"
                  stroke="white"
                  strokeWidth="0.4"
                />
                <line
                  x1="0"
                  y1="40"
                  x2="80"
                  y2="40"
                  stroke="white"
                  strokeWidth="0.4"
                />
                <circle cx="40" cy="40" r="6" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo-gallery)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-dmi-gold font-semibold text-xs tracking-widest uppercase mb-3">
            Dokumentasi
          </p>
          <h1
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading), serif' }}
          >
            Gallery DMI
          </h1>
          <p className="text-white/70 max-w-lg text-base leading-relaxed">
            Dokumentasi kegiatan Dewan Masjid Indonesia dari seluruh penjuru
            nusantara.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Filter bar: search kiri, event dropdown kanan ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari foto..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full bg-white focus:outline-none focus:border-dmi-green focus:ring-2 focus:ring-dmi-green/20 w-full sm:w-56 transition-all"
            />
          </div>
          <EventFilter
            events={events}
            activeEventId={activeEventId}
            onSelect={handleEventSelect}
            onSearchChange={setEventSearch}
            eventSearch={eventSearch}
            loading={eventsLoading}
          />
        </div>

        {/* ── Gallery grid ── */}
        <GalleryGrid
          items={galleries}
          loading={loading}
          onClickItem={(index) => setLightboxIndex(index)}
        />

        {/* ── Pagination ── */}
        {!loading && renderPagination()}
      </div>

      {/* ── Lightbox ── */}
      <GalleryLightbox
        items={galleries}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </div>
  )
}
