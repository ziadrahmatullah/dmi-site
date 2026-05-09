import { BASE_URL } from '@/lib/config'
import type { ArticleFilterParams, ArticleListResponse, Article } from '@/types/artikel'

async function apiFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== '') {
      url.searchParams.set(key, String(val))
    }
  })
  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

export async function fetchArticles(
  params: ArticleFilterParams
): Promise<ArticleListResponse> {
  return apiFetch('/articles', {
    page: params.page ?? 1,
    limit: params.limit ?? 9,
    search: params.search,
  })
}

export async function fetchArticleById(id: number): Promise<Article> {
  const res = await fetch(`${BASE_URL}/articles/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Artikel tidak ditemukan')
  const json = await res.json()
  return json.data as Article
}
