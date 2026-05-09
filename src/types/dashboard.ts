export interface DistrictAmount {
  district_id: number
  district_name: string
  amount: number
  percentage: number
}

export interface DashboardTransaction {
  total_transactions: number
  total_income: number
  total_expense: number
  total_net: number
  income_vs_expense: {
    total_income: number
    total_expense: number
  }
  income_by_district: DistrictAmount[]
  expense_by_district: DistrictAmount[]
}

export interface DashboardTransactionResponse {
  data: DashboardTransaction
  message: string
}

export interface QurbanByAnimalType {
  animal_type_id: number
  animal_type_name: string
  total_quantity: number
  percentage: number
}

export interface DashboardQurban {
  year: number
  total_qurban: number
  total_quantity: number
  qurban_by_animal_type: QurbanByAnimalType[]
}

export interface DashboardQurbanResponse {
  data: DashboardQurban
  message: string
}
