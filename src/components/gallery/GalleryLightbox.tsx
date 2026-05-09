'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryItem } from '@/types/gallery'

interface Props {
  items: GalleryItem[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll while open
  useEffect(() => {
    if (activeIndex === null) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeIndex])

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')
        onNavigate((activeIndex - 1 + items.length) % items.length)
      if (e.key === 'ArrowRight')
        onNavigate((activeIndex + 1) % items.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex, items.length, onClose, onNavigate])

  if (!mounted || activeIndex === null) return null

  const item = items[activeIndex]

  return createPortal(
    <div
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Tutup"
      >
        <X size={24} />
      </button>

      {/* Prev */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((activeIndex - 1 + items.length) % items.length)
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Foto sebelumnya"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Next */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((activeIndex + 1) % items.length)
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Foto selanjutnya"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Content */}
      <div
        className="mx-14 max-w-5xl w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.description || item.event.name}
          className="w-full object-contain rounded-xl"
          style={{ maxHeight: '85vh', maxWidth: '90vw', margin: '0 auto', display: 'block' }}
        />
        <div className="mt-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-dmi-green/80 text-white mb-2">
            {item.event.name}
          </span>
          {item.description && (
            <p className="text-white/80 text-sm mt-1 max-w-xl mx-auto leading-relaxed">
              {item.description}
            </p>
          )}
          <p className="text-white/40 text-xs mt-3">
            {activeIndex + 1} / {items.length}
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}
