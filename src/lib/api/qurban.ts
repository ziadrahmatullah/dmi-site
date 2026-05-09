import { BASE_URL } from '@/lib/config';
import type { AnimalType, QurbanListResponse, QurbanMeta, QurbanMosque, QurbanDistrict } from '@/types/qurban';

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

export async function fetchAnimalTypes(
  search = '',
  page = 1,
  limit = 100
): Promise<{ data: AnimalType[]; meta: QurbanMeta }> {
  return apiFetch('/animal-types', { page, limit, search });
}

export async function fetchQurbanDistricts(
  search = '',
  page = 1,
  limit = 100
): Promise<{ data: QurbanDistrict[]; meta: QurbanMeta }> {
  return apiFetch('/districts', { page, limit, search });
}

export async function fetchQurbanMosques(
  districtId?: number,
  search = '',
  page = 1,
  limit = 100
): Promise<{ data: QurbanMosque[]; meta: QurbanMeta }> {
  return apiFetch('/mosques', { page, limit, search, district_id: districtId });
}

export async function fetchQurbans(params: {
  page?: number;
  limit?: number;
  search?: string;
  animal_type_id?: number;
  district_id?: number;
  mosque_id?: number;
  start_date?: string;
  end_date?: string;
}): Promise<QurbanListResponse> {
  return apiFetch('/qurbans', {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    search: params.search,
    animal_type_id: params.animal_type_id,
    district_id: params.district_id,
    mosque_id: params.mosque_id,
    start_date: params.start_date,
    end_date: params.end_date,
  });
}

export async function downloadQurbans(params: {
  search?: string;
  animal_type_id?: number;
  district_id?: number;
  mosque_id?: number;
  start_date?: string;
  end_date?: string;
}): Promise<Blob> {
  const url = new URL(`${BASE_URL}/qurbans`);
  const qp: Record<string, string | number | undefined> = {
    ...params,
    download: 'true',
  };
  Object.entries(qp).forEach(([key, val]) => {
    if (val !== undefined && val !== '') {
      url.searchParams.set(key, String(val));
    }
  });
  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error(`Download error ${res.status}`);
  return res.blob();
}
