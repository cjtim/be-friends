import { config } from 'config'
import { User } from 'interfaces/User'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import axios from './axios'

// eslint-disable-next-line no-unused-vars
type option<T> = (_: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>> | GetServerSidePropsResult<T>
type returnTypeNextContextResult<T> = Promise<GetServerSidePropsResult<T & { user: User }>>

const appendUser = (result: any, user: User) => {
  return {
    ...result,
    props: {
      ...result.props,
      user,
    },
  }
}

export const AuthGetServerSideProps =
  <T>(opt?: option<T>) =>
  async (ctx: GetServerSidePropsContext): returnTypeNextContextResult<T> => {
    // Get token from user client cookies
    const jwt = ctx.req.cookies[config.cookies.token]

    let user: User = { name: '', id: '', exp: 0 }
    try {
      if (jwt && jwt !== '') {
        // Server side call
        // No client cookie passed, Need to manual input
        user = await getUser(ctx.req.headers.cookie)
      } else {
        throw Error('Unauthenticate')
      }
    } catch (e) {
      // If Token expire
      // If Token Invalid
      // If Token not exist in cookies

      // set redirect page
      ctx.res.setHeader('set-cookie', [`${config.cookies.previousPage}=${ctx.resolvedUrl}; Path=/`])
      return {
        redirect: {
          permanent: false,
          destination: await getLoginLink(),
        },
      }
    }

    if (opt && typeof opt === 'function') {
      const result = await opt(ctx)
      return appendUser(result, user)
    }
    return appendUser({}, user)
  }

export const getLoginLink = async () => {
  const { data } = await axios.get<string>(config.login.GET_line)
  return data
}

export const getUser = async (cookie: string | undefined): Promise<User> => {
  const { data } = await axios.get<User>(config.login.GET_me, {
    headers: {
      Cookie: cookie || '',
    },
  })
  return data
}
