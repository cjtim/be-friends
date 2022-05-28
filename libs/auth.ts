import { config } from 'config'
import { User } from 'interfaces/User'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

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
    if (typeof opt?.contexts === 'function') {
      const result = await opt.contexts(ctx)
      return appendResult(result, {
        name: ctx.req.cookies[config.cookies.token],
        userId: ctx.req.cookies[config.cookies.token],
      })
    }
    return appendResult(
      {},
      {
        name: ctx.req.cookies[config.cookies.token],
        userId: ctx.req.cookies[config.cookies.token],
      },
    )
  }
