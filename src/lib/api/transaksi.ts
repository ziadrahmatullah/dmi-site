import { BASE_URL } from '@/lib/config';
import type {
  Category,
  District,
  Mosque,
  Meta,
  TransactionSummary,
  TrendItem,
  FilterState,
} from '@/types/transaksi';

async function apiFetch<T>(path: string, params: Record<string, string | number | undefined>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== '') {
      url.searchParams.set(key, String(val));
    }
  });
  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export async function fetchCategories(
  search = '',
  page = 1,
  limit = 100
): Promise<{ data: Category[]; meta: Meta }> {
  return apiFetch('/categories', { page, limit, search });
}

export async function fetchDistricts(
  search = '',
  page = 1,
  limit = 100
): Promise<{ data: District[]; meta: Meta }> {
  return apiFetch('/districts', { page, limit, search });
}

export async function fetchMosques(
  districtId?: number,
  search = '',
  page = 1,
  limit = 100
): Promise<{ data: Mosque[]; meta: Meta }> {
  return apiFetch('/mosques', {
    page,
    limit,
    search,
    district_id: districtId,
  });
}

export async function fetchTransactions(params: {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: number;
  district_id?: number;
  mosque_id?: number;
  start_date?: string;
  end_date?: string;
  order_by?: string;
}): Promise<{ data: TransactionSummary }> {
  return apiFetch('/transactions', {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    search: params.search,
    category_id: params.category_id,
    district_id: params.district_id,
    mosque_id: params.mosque_id,
    start_date: params.start_date,
    end_date: params.end_date,
    order_by: params.order_by,
  });
}

export async function fetchTransactionTrend(params: {
  filter: 'ytd' | 'mtd';
  year: number;
  month: number;
  category_id?: number;
  district_id?: number;
  mosque_id?: number;
}): Promise<{ data: { filter: string; year: number; month?: number; data: TrendItem[] } }> {
  return apiFetch('/transactions/trend', {
    filter: params.filter,
    year: params.year,
    month: params.filter === 'mtd' ? params.month : undefined,
    category_id: params.category_id,
    district_id: params.district_id,
    mosque_id: params.mosque_id,
  });
}

export async function downloadTransaksi(params: FilterState): Promise<Blob> {
  const url = new URL(`${BASE_URL}/transactions`);
  const qp: Record<string, string | number | undefined> = {
    search: params.search,
    category_id: params.category_id,
    district_id: params.district_id,
    mosque_id: params.mosque_id,
    start_date: params.start_date,
    end_date: params.end_date,
    download: 'true',
  };
  Object.entries(qp).forEach(([key, val]) => {
    if (val !== undefined && val !== '') {
      url.searchParams.set(key, String(val));
    }
  });
  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error('Download gagal');
  return res.blob();
}
