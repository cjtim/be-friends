import { Tag } from './Tag'

export interface User {
  id: string
  name: string
  email?: string
  line_uid?: string
  picture_url?: string
  exp: number // new Date(exp * 1000)

  tags?: Tag[]
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserRegister extends UserLogin {
  name: string
  confirm_password: string
}
