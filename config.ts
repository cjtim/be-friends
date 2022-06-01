const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export const config = {
  cookies: {
    token: 'authToken',
  },
  login: {
    GET_line: `${BACKEND_URL}/api/v1/auth/line`,
    GET_me: `${BACKEND_URL}/api/v1/auth/me`,
  },
}

export const internalPages = {
  login: {
    line: '/user/login',
  },
}
