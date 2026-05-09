'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import type { Event } from '@/types/gallery'

interface Props {
  events: Event[]
  activeEventId: number | null
  onSelect: (id: number | null) => void
  onSearchChange: (search: string) => void
  eventSearch: string
  loading?: boolean
}

export default function EventFilter({
  events,
  activeEventId,
  onSelect,
  onSearchChange,
  eventSearch,
  loading = false,
}: Props) {
  return (
    <div className="flex items-center gap-3 shrink-0 flex-wrap">
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={eventSearch}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari event..."
          className="h-10 pl-8 pr-3 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-dmi-green focus:ring-2 focus:ring-dmi-green/20 transition-colors"
          style={{ width: '180px' }}
        />
      </div>
      <select
        value={activeEventId ?? ''}
        onChange={(e) => {
          const val = e.target.value
          onSelect(val === '' ? null : Number(val))
        }}
        disabled={loading}
        className="h-10 border border-gray-300 rounded-lg px-3 text-sm bg-white focus:outline-none focus:border-dmi-green focus:ring-2 focus:ring-dmi-green/20 transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
        style={{ width: '240px' }}
      >
        <option value="">
          {loading ? 'Memuat event...' : 'Semua Event'}
        </option>
        {!loading &&
          events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
      </select>
    </div>
  )
}
