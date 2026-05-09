'use client'

import { ZoomIn, ImageOff } from 'lucide-react'
import type { GalleryItem } from '@/types/gallery'

interface Props {
  items: GalleryItem[]
  loading: boolean
  onClickItem: (index: number) => void
}

const SKELETON_HEIGHTS = [200, 280, 240, 260, 200, 280, 240, 200, 260]

export default function GalleryGrid({ items, loading, onClickItem }: Props) {
  if (loading) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
        {SKELETON_HEIGHTS.map((h, i) => (
          <div key={i} className="break-inside-avoid mb-3">
            <div
              className="skeleton rounded-xl w-full"
              style={{ height: `${h}px` }}
            />
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ImageOff size={40} className="text-gray-300" />
        </div>
        <h3 className="font-semibold text-gray-700 text-lg mb-1">
          Belum ada foto
        </h3>
        <p className="text-gray-400 text-sm">
          Belum ada foto untuk event ini.
        </p>
      </div>
    )
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="break-inside-avoid mb-3 group relative overflow-hidden rounded-xl cursor-pointer animate-fade-in-up"
          style={{ animationDelay: `${Math.min(i * 60, 480)}ms` }}
          onClick={() => onClickItem(i)}
        >
          <img
            src={item.image}
            alt={item.description || item.event.name}
            className="w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col justify-between p-4">
            <div className="flex justify-end">
              <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ZoomIn size={18} className="text-white" />
              </div>
            </div>
            <div>
              {item.description && (
                <p className="text-white/90 text-xs leading-relaxed mb-2 line-clamp-2">
                  {item.description}
                </p>
              )}
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-dmi-green/80 text-white">
                {item.event.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
