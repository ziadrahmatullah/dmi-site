export interface Article {
  id: number
  is_highlight: boolean
  status: 'published' | 'draft'
  image: string
  title: string
  slug: string
  description: string
  excerpt: string
  content: string
  created_by: number
  created_at: string
  updated_at: string
}

export interface ArticleFilterParams {
  page?: number
  limit?: number
  search?: string
}

export interface ArticleListResponse {
  data: Article[]
  message: string
  meta: {
    current_page: number
    current_item: number
    total_page: number
    total_item: number
  }
}
