'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Share2, Twitter, Copy, Check } from 'lucide-react'
import { fetchArticles } from '@/lib/api/artikel'
import type { Article } from '@/types/artikel'

interface Props {
  currentId: number
  articleTitle?: string
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function SidebarSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="skeleton w-20 h-20 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <div className="skeleton h-3 rounded w-full" />
            <div className="skeleton h-3 rounded w-4/5" />
            <div className="skeleton h-3 rounded w-2/5 mt-2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ArticleSidebar({
  currentId,
  articleTitle = '',
}: Props) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchArticles({ page: 1, limit: 8 })
      .then((res) => {
        const filtered = res.data
          .filter((a) => a.id !== currentId)
          .slice(0, 4)
        setArticles(filtered)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [currentId])

  const getPageUrl = () =>
    typeof window !== 'undefined' ? window.location.href : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(getPageUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Artikel Lainnya */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3
          className="font-bold text-gray-900 text-lg mb-5 pb-3 border-b border-gray-100"
          style={{ fontFamily: 'var(--font-heading), serif' }}
        >
          Artikel Lainnya
        </h3>
        {loading ? (
          <SidebarSkeleton />
        ) : articles.length === 0 ? (
          <p className="text-gray-400 text-sm">Tidak ada artikel lain.</p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/artikel/${article.id}`}
                className="flex gap-3 group hover:bg-gray-50 rounded-xl p-2 -mx-2 transition-colors"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />
                <div className="min-w-0 py-0.5">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-dmi-green transition-colors leading-snug line-clamp-2 mb-1.5">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={11} />
                    <span>{formatDate(article.created_at)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bagikan Artikel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3
          className="font-bold text-gray-900 text-base mb-4 pb-3 border-b border-gray-100"
          style={{ fontFamily: 'var(--font-heading), serif' }}
        >
          Bagikan Artikel
        </h3>
        <div className="space-y-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${articleTitle} ${getPageUrl()}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Share2 size={16} />
            WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(getPageUrl())}&text=${encodeURIComponent(articleTitle)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Twitter size={16} />
            Twitter / X
          </a>
          <button
            onClick={handleCopy}
            className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-colors cursor-pointer"
          >
            {copied ? (
              <Check size={16} className="text-dmi-green" />
            ) : (
              <Copy size={16} />
            )}
            {copied ? 'Tersalin!' : 'Salin Tautan'}
          </button>
        </div>
      </div>
    </div>
  )
}
