import { config } from 'config'
import { User } from 'interfaces/User'
import axios from 'libs/axios'
import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage, Redirect } from 'next'

const UserLineCallback: NextPage = () => {
  return <></>
}

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ redirect: Redirect }>> => {
  const code = ctx.query.code as string
  try {
    const { data: jwt } = await axios.get<string>(config.login.GET_line_jwt, { params: { code } })
    const { data: user } = await axios.get<User>(config.login.GET_me, { headers: { Authorization: `Bearer ${jwt}` } })
    // Set token in cookies
    ctx.res.setHeader('set-cookie', [`${config.cookies.token}=${jwt}; Expires=${new Date(user.exp * 1000)}; Path=/`])
    // Redirect to previous page
    return {
      redirect: {
        destination: ctx.req.cookies[config.cookies.previousPage] || '/',
        permanent: false,
      },
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

export default UserLineCallback
