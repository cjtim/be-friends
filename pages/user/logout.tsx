import { config } from 'config'
import axios from 'libs/axios'
import { NextPage, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next'

const UserLogout: NextPage = () => <></>

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ redirect: Redirect }>> => {
  axios.get(config.login.GET_logout, {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  })
  ctx.res.setHeader('set-cookie', [`${config.cookies.token}=; Max-Age=-1; Path=/`])
  // Redirect to previous page
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}

export default UserLogout
