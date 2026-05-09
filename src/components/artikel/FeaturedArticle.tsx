'use client'

import Link from 'next/link'
import { Calendar, ArrowRight, Star } from 'lucide-react'
import type { Article } from '@/types/artikel'

interface Props {
  article: Article
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export default function FeaturedArticle({ article }: Props) {
  return (
    <div className="mb-12 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-fade-in-up">
      <div className="flex flex-col lg:flex-row">
        {/* Photo — 60% width on desktop */}
        <div className="relative lg:w-[60%] overflow-hidden">
          <Link
            href={`/artikel/${article.id}`}
            className="block h-full group"
            tabIndex={-1}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-72 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
              style={{ minHeight: '320px' }}
            />
            {/* Subtle gradient over photo */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/10 pointer-events-none" />
          </Link>
          {/* Gold highlight badge */}
          <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-dmi-gold text-white shadow-lg">
            <Star size={11} fill="white" />
            Artikel Pilihan
          </span>
        </div>

        {/* Content — 40% width on desktop */}
        <div className="lg:w-[40%] p-8 lg:p-10 flex flex-col justify-center">
          <p className="text-xs font-bold tracking-widest uppercase text-dmi-gold mb-4">
            Featured
          </p>
          <Link href={`/artikel/${article.id}`}>
            <h2
              className="text-2xl lg:text-[28px] font-bold text-gray-900 leading-tight mb-4 hover:text-dmi-green transition-colors"
              style={{
                fontFamily: 'var(--font-heading), serif',
                fontStyle: 'italic',
              }}
            >
              {article.title}
            </h2>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 mb-6">
            {article.excerpt || article.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-7">
            <Calendar size={12} />
            <span>{formatDate(article.created_at)}</span>
          </div>
          <Link
            href={`/artikel/${article.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-dmi-green text-white text-sm font-semibold rounded-full hover:bg-dmi-green-dark transition-colors self-start"
          >
            Baca Selengkapnya
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
