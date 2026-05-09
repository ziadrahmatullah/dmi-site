import { BASE_URL } from '@/lib/config'
import type {
  DashboardTransactionResponse,
  DashboardQurbanResponse,
} from '@/types/dashboard'

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

export async function fetchDashboardTransaction(params: {
  filter: 'ytd' | 'mtd'
  year?: number
  month?: number
}): Promise<DashboardTransactionResponse> {
  return apiFetch('/dashboard/transaction', {
    filter: params.filter,
    year: params.year,
    month: params.filter === 'mtd' ? params.month : undefined,
  })
}

export async function fetchDashboardQurban(params: {
  year: number
}): Promise<DashboardQurbanResponse> {
  return apiFetch('/dashboard/qurban', { year: params.year })
}
