export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

export const config = {
  cookies: {
    token: 'authToken',
    previousPage: 'previousPage',
  },
  login: {
    GET_logout: `/api/v1/auth/logout`,
    GET_line: `/api/v1/auth/line`,
    GET_me: `/api/v1/auth/me`,
    GET_line_jwt: `/api/v1/auth/line/jwt`,
    POST_line_register: `/api/v1/auth/register`,
    POST_line_login: `/api/v1/auth/login`,
  },
}

export const internalPages = {
  index: '/',
  user: {
    index: '/user',
    login: '/user/login',
    logout: '/user/logout',
  },
  about: '/about',
  findPets: '/find',
}
