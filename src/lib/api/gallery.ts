import { BASE_URL } from '@/lib/config'
import type { GalleryFilterParams, GalleryListResponse, Event } from '@/types/gallery'

interface EventListResponse {
  data: Event[]
  message: string
  meta: {
    current_page: number
    current_item: number
    total_page: number
    total_item: number
  }
}

async function apiFetch<T>(
  path: string,
  params: Record<string, string | number | undefined>
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

export async function fetchEvents(
  search = '',
  page = 1,
  limit = 100
): Promise<EventListResponse> {
  return apiFetch('/events', { search, page, limit })
}

export async function fetchGalleries(
  params: GalleryFilterParams
): Promise<GalleryListResponse> {
  return apiFetch('/galleries', {
    page: params.page ?? 1,
    limit: params.limit ?? 12,
    search: params.search,
    event_id: params.event_id,
  })
}
