import { config } from 'config'
import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage, Redirect } from 'next'

const UserLineCallback: NextPage = () => {
  return <></>
}

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ redirect: Redirect }>> => {
  return {
    redirect: {
      destination: ctx.req.cookies[config.cookies.previousPage] || '/',
      permanent: false,
    },
  }
}

export default UserLineCallback
