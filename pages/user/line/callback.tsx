import { config } from 'config'
import { User } from 'interfaces/User'
import axios from 'libs/axios'
import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage, Redirect } from 'next'

// eslint-disable-next-line react/jsx-no-useless-fragment
const UserLineCallback: NextPage = () => <></>

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ redirect: Redirect }>> => {
  try {
    const { data: jwt } = await axios.get<string>(config.login.GET_line_jwt, { params: ctx.query })
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
