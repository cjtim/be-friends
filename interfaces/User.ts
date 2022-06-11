export interface User {
  id: string
  name: string
  email?: string
  line_uid?: string
  picture_url?: string
  exp: number // new Date(exp * 1000)
}

export interface UserLogin {
  email: string
  password: string
}
