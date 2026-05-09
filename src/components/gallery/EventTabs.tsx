'use client'

import type { Event } from '@/types/gallery'

interface Props {
  events: Event[]
  activeEventId: number | null
  onSelect: (id: number | null) => void
  loading?: boolean
}

const SKELETON_WIDTHS = [88, 104, 76, 120, 92]

export default function EventTabs({
  events,
  activeEventId,
  onSelect,
  loading = false,
}: Props) {
  if (loading) {
    return (
      <div className="flex gap-2 overflow-hidden">
        {SKELETON_WIDTHS.map((w, i) => (
          <div
            key={i}
            className="skeleton rounded-full h-9 flex-shrink-0"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <button
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
          activeEventId === null
            ? 'bg-dmi-green text-white shadow-sm'
            : 'bg-white text-gray-600 hover:bg-green-50 hover:text-dmi-green border border-gray-200'
        }`}
      >
        Semua
      </button>
      {events.map((event) => (
        <button
          key={event.id}
          onClick={() => onSelect(event.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
            activeEventId === event.id
              ? 'bg-dmi-green text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-green-50 hover:text-dmi-green border border-gray-200'
          }`}
        >
          {event.name}
        </button>
      ))}
    </div>
  )
}
