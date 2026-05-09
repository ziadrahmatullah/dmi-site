export interface Meta {
  current_page: number;
  current_item: number;
  total_page: number;
  total_item: number;
}

export interface Category {
  id: number;
  category_type: 'pemasukan' | 'pengeluaran';
  name: string;
  created_at: string;
  updated_at: string;
}

export interface District {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Mosque {
  id: number;
  name: string;
  district_id: number;
  pic_name: string;
  pic_phone: string;
  description: string;
  district: District;
}

export interface Transaction {
  id: number;
  category_id: number;
  category_type: 'pemasukan' | 'pengeluaran';
  district_id: number;
  mosque_id: number;
  amount: number;
  description: string;
  transaction_date: string;
  category: Category;
  district: District;
  mosque: Mosque;
}

export interface TrendItem {
  label: string;
  period: string;
  total_income: number;
  total_expense: number;
  net: number;
}

export interface TransactionSummary {
  data: Transaction[];
  meta: Meta;
  total_income: number;
  total_expense: number;
  total_net: number;
}

export interface FilterState {
  search: string;
  category_id?: number;
  district_id?: number;
  mosque_id?: number;
  start_date: string;
  end_date: string;
}
