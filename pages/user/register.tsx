import { Center } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import RegisterCard from 'components/login/RegisterCard'
import { config } from 'config'
import { User, UserRegister } from 'interfaces/User'
import Cookies from 'js-cookie'
import { getLoginLink } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { UserProps } from 'pages/_app'
import { SubmitHandler } from 'react-hook-form'

interface Props extends UserProps {}

const RegisterPage: NextPage<Props> = ({ user }) => {
  const { t } = useTranslation('user')
  const router = useRouter()
  const onSubmitRegister: SubmitHandler<UserRegister> = async values => {
    const { data: jwt } = await axios.post<string>(config.login.POST_line_register, values)
    const { data: userPayload } = await axios.get<User>(config.login.GET_me, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    Cookies.set(config.cookies.token, jwt, { expires: new Date(userPayload.exp * 1000), path: '/' })
    router.push('/')
  }

  return (
    <PageLayout title={t('register')}>
      <Navbar user={user} />

      <Center h="80vh">
        <RegisterCard onSubmitRegister={onSubmitRegister} />
      </Center>
    </PageLayout>
  )
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'user'])),
    loginUrl: await getLoginLink(ctx.req.headers.host || 'localhost:3000'),
  },
})

export default RegisterPage
