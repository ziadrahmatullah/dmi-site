'use client'

import Link from 'next/link'
import { Calendar, Star } from 'lucide-react'
import type { Article } from '@/types/artikel'

interface Props {
  article: Article
  index?: number
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export default function ArticleCard({ article, index = 0 }: Props) {
  return (
    <Link
      href={`/artikel/${article.id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 80, 480)}ms` }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Highlight badge */}
        {article.is_highlight && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-dmi-gold text-white shadow-md">
            <Star size={10} fill="white" />
            Highlight
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <Calendar size={12} />
          <span>{formatDate(article.created_at)}</span>
        </div>
        <h2
          className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-dmi-green transition-colors"
          style={{ fontFamily: 'var(--font-heading), serif' }}
        >
          {article.title}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
          {article.excerpt || article.description}
        </p>
        <span className="text-dmi-green text-sm font-semibold group-hover:underline">
          Baca →
        </span>
      </div>
    </Link>
  )
}
