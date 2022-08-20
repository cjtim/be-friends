import { TimestampColumns } from './common'

export interface Pet extends TimestampColumns {
  id: number
  name: string
  description?: string
  lat: number
  lng: number
  picture_urls: {
    picture_url: string
  }[]
}

export interface PetRegister {
  name: string
  description?: string
  lat: number
  lng: number
  images?: File[]
  tag_ids?: number[]
}

// [post] /api/v1/pet/img
export interface PetImageResponse {
  downloadURL: string
}
