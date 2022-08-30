import { TimestampColumns } from './common'
import { Tag } from './Tag'

export interface User extends TimestampColumns {
  id: string
  name: string
  email?: string
  line_uid?: string
  description?: string
  picture_url?: string
  phone?: string
  is_org: boolean
  is_admin: boolean

  lat?: number
  lng?: number

  exp: number // new Date(exp * 1000)
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserRegister extends UserLogin {
  name: string
  confirm_password: string
}
