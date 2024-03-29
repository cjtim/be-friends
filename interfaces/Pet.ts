import { TimestampColumns } from './common'
import { Status } from './status'
import { Tag } from './Tag'

export interface Pet extends TimestampColumns {
  id: number
  name: string
  description?: string
  lat: number
  lng: number
  user_id: string
  status: Status
  picture_urls: {
    picture_url: string
  }[]
  liked: string[]
  interested: string[]
  tags: Tag[]
}

// For frontend form
export interface PetRegister {
  name: string
  description?: string
  lat: number
  lng: number
  images?: File[]
  tag_ids?: number[]
  status: string
}

// [post] /api/v1/pet/img
export interface PetImageResponse {
  downloadURL: string
}
