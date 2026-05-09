export interface AnimalType {
  id: number;
  name: string;
  description?: string;
}

export interface QurbanDistrict {
  id: number;
  name: string;
}

export interface QurbanMosque {
  id: number;
  name: string;
  district_id: number;
  district?: QurbanDistrict;
}

export interface Qurban {
  id: number;
  name: string;
  mosque_id: number;
  animal_type_id: number;
  quantity: number;
  qurban_date: string;
  mosque?: QurbanMosque;
  animal_type?: AnimalType;
}

export interface QurbanMeta {
  current_page: number;
  current_item: number;
  total_page: number;
  total_item: number;
}

export interface QurbanListResponse {
  data: Qurban[];
  message: string;
  meta: QurbanMeta;
}

export interface QurbanFilterState {
  search: string;
  animal_type_id?: number;
  district_id?: number;
  mosque_id?: number;
  start_date: string;
  end_date: string;
}
