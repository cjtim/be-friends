import { TimestampColumns } from './common'

export interface Pet extends TimestampColumns {
  id: number
  name: string
  description?: string
  lat: number
  lng: number
}
