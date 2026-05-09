'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ChevronRight,
  Calendar,
  Clock,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react'
import { fetchArticleById } from '@/lib/api/artikel'
import type { Article } from '@/types/artikel'
import ArticleSidebar from '@/components/artikel/ArticleSidebar'

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function estimateReadTime(content: string): number {
  const words = content
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3 pt-2">
        <div className="skeleton h-9 w-full rounded" />
        <div className="skeleton h-9 w-4/5 rounded" />
        <div className="skeleton h-9 w-3/5 rounded" />
      </div>
      <div className="flex gap-5 pt-1">
        <div className="skeleton h-4 w-32 rounded" />
        <div className="skeleton h-4 w-24 rounded" />
      </div>
      <div className="skeleton w-full rounded-xl" style={{ height: '420px' }} />
      <div className="space-y-3 pt-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`skeleton h-4 rounded ${i % 4 === 3 ? 'w-3/5' : 'w-full'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ArtikelDetailPage() {
  const params = useParams()
  const rawId = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
  const articleId = Number(rawId)

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!articleId || isNaN(articleId)) {
      setError(true)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(false)
    fetchArticleById(articleId)
      .then((data) => setArticle(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [articleId])

  if (error) {
    return (
      <div className="min-h-screen bg-dmi-cream flex flex-col items-center justify-center py-20 text-center px-4">
        <AlertCircle size={52} className="text-red-400 mb-5" />
        <h2 className="font-bold text-gray-800 text-2xl mb-2">
          Artikel Tidak Ditemukan
        </h2>
        <p className="text-gray-500 text-sm mb-7">
          Artikel yang kamu cari tidak tersedia atau telah dihapus.
        </p>
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 px-6 py-3 bg-dmi-green text-white text-sm font-semibold rounded-full hover:bg-dmi-green-dark transition-colors"
        >
          <ArrowLeft size={15} />
          Kembali ke Artikel
        </Link>
      </div>
    )
  }

  const readTime = article ? estimateReadTime(article.content) : 0
  const shortTitle = article
    ? article.title.length > 45
      ? article.title.slice(0, 45) + '...'
      : article.title
    : 'Memuat...'

  return (
    <div className="min-h-screen bg-dmi-cream pt-20">
      {/* ── Breadcrumb bar ── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link
              href="/"
              className="hover:text-dmi-green transition-colors whitespace-nowrap"
            >
              Beranda
            </Link>
            <ChevronRight size={13} className="shrink-0 text-gray-300" />
            <Link
              href="/artikel"
              className="hover:text-dmi-green transition-colors whitespace-nowrap"
            >
              Artikel
            </Link>
            <ChevronRight size={13} className="shrink-0 text-gray-300" />
            <span className="text-gray-800 font-medium truncate">
              {shortTitle}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
          {/* ── Main content ── */}
          <main>
            {loading ? (
              <DetailSkeleton />
            ) : article ? (
              <article className="animate-fade-in">
                <style>{`
                  .article-content p { margin-bottom: 1.5rem; }
                  .article-content h2 {
                    font-family: var(--font-heading), serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #111827;
                    margin: 2.5rem 0 1rem;
                    line-height: 1.3;
                  }
                  .article-content h3 {
                    font-family: var(--font-heading), serif;
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin: 2rem 0 0.75rem;
                  }
                  .article-content a { color: #15803d; text-decoration: underline; }
                  .article-content a:hover { color: #14532d; }
                  .article-content ul, .article-content ol {
                    padding-left: 1.5rem;
                    margin-bottom: 1.5rem;
                  }
                  .article-content ul { list-style-type: disc; }
                  .article-content ol { list-style-type: decimal; }
                  .article-content li { margin-bottom: 0.5rem; }
                  .article-content blockquote {
                    border-left: 4px solid #15803d;
                    padding-left: 1.25rem;
                    color: #6b7280;
                    font-style: italic;
                    margin: 2rem 0;
                  }
                  .article-content img { border-radius: 12px; margin: 1.5rem 0; max-width: 100%; }
                `}</style>

                <h1
                  className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight mb-6"
                  style={{ fontFamily: 'var(--font-heading), serif' }}
                >
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-gray-400" />
                    <span>{formatDate(article.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-gray-400" />
                    <span>{readTime} menit baca</span>
                  </div>
                </div>

                <div className="mb-10 overflow-hidden rounded-xl">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full object-cover"
                    style={{ maxHeight: '480px' }}
                  />
                </div>

                {article.excerpt && (
                  <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-dmi-green pl-5">
                    {article.excerpt}
                  </p>
                )}

                <div
                  className="article-content"
                  style={{ fontSize: '17px', lineHeight: '1.8', color: '#374151' }}
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <div className="mt-12 pt-8 border-t border-gray-100">
                  <Link
                    href="/artikel"
                    className="inline-flex items-center gap-2 text-sm text-dmi-green font-semibold hover:underline"
                  >
                    <ArrowLeft size={15} />
                    Kembali ke Artikel
                  </Link>
                </div>
              </article>
            ) : null}
          </main>

          {/* ── Sidebar ── */}
          <aside>
            <div className="sticky top-28">
              <ArticleSidebar
                currentId={articleId}
                articleTitle={article?.title ?? ''}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
