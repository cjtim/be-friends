export const config = {
  cookies: {
    token: 'authToken',
  },
  login: {
    GET_line: 'http://localhost:8080/auth/line',
    GET_me: 'http://localhost:8080/auth/me',
  },
}

export const internalPages = {
  login: {
    line: '/user/login',
  },
}
