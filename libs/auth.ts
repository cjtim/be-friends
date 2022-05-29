import { config } from 'config'
import { User } from 'interfaces/User'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import axios from './axios'

type option = {
  contexts: (
    context: GetServerSidePropsContext,
  ) => Promise<GetServerSidePropsResult<any>> | GetServerSidePropsResult<any>
}

const appendResult = (result: any, user: User) => {
  return {
    ...result,
    props: {
      ...result.props,
      user,
    },
  }
}

export const AuthGetServerSideProps =
  <T>(opt?: option) =>
  async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T & { user: User }>> => {
    const jwt = ctx.req.cookies[config.cookies.token]
    let user: User = { name: '', id: '' }
    if (jwt && jwt !== '') {
      const { data } = await axios.get<User>(config.login.GET_me, {
        headers: {
          Cookie: ctx.req.headers.cookie || '',
        },
      })
      user = data
    } else {
      return {
        redirect: {
          permanent: false,
          destination: await getLoginLink(),
        },
      }
    }

    if (typeof opt?.contexts === 'function') {
      const result = await opt.contexts(ctx)
      return appendResult(result, user)
    }
    return appendResult({}, user)
  }

export const getLoginLink = async () => {
  const { data } = await axios.get<string>(config.login.GET_line)
  return data
}
