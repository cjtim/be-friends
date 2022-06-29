import { TimestampColumns } from './common'

export interface Tag extends TimestampColumns {
  id: number
  name: string
  description?: string
  is_internal?: boolean
}
