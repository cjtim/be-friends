const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export const config = {
  cookies: {
    token: 'authToken',
    previousPage: 'previousPage',
  },
  login: {
    GET_line: `${BACKEND_URL}/api/v1/auth/line`,
    GET_me: `${BACKEND_URL}/api/v1/auth/me`,
    GET_line_jwt: `${BACKEND_URL}/api/v1/auth/line/jwt`,
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
  findPets: '/find'
}
