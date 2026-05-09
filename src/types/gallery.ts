export interface Event {
  id: number
  name: string
  description: string
  created_by: number
  created_at: string
  updated_at: string
}

export interface GalleryItem {
  id: number
  event_id: number
  image: string
  description: string
  created_by: number
  created_at: string
  updated_at: string
  event: Event
}

export interface GalleryFilterParams {
  page?: number
  limit?: number
  search?: string
  event_id?: number
}

export interface GalleryListResponse {
  data: GalleryItem[]
  message: string
  meta: {
    current_page: number
    current_item: number
    total_page: number
    total_item: number
  }
}
