import { Center } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import LoginCard from 'components/login/LoginCard'
import { config } from 'config'
import { User, UserLogin } from 'interfaces/User'
import Cookies from 'js-cookie'
import { getLoginLink } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { BaseNextProps } from 'pages/_app'
import { SubmitHandler } from 'react-hook-form'

interface Props extends BaseNextProps {
  loginUrl: string
}

const UserLogin: NextPage<Props> = ({ loginUrl, user }) => {
  const router = useRouter()
  const onClick = async () => {
    window.location.href = loginUrl
  }
  const onSubmitLogin: SubmitHandler<UserLogin> = async values => {
    try {
      const { data: jwt } = await axios.post<string>(config.login.POST_line_login, values)
      const { data: user } = await axios.get<User>(config.login.GET_me, { headers: { Authorization: `Bearer ${jwt}` } })
      console.log(jwt)
      Cookies.set(config.cookies.token, jwt, { expires: new Date(user.exp * 1000), path: '/' })
      router.push('/')
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <PageLayout title="Login">
      <Navbar user={user} />
      <Center>
        <LoginCard onClickLineLogin={onClick} onSubmitLogin={onSubmitLogin} />
      </Center>
    </PageLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'user'])),
      loginUrl: await getLoginLink(ctx.req.headers.host || 'localhost:3000'),
    },
  }
}

export default UserLogin
