import { Center } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import UserPassword from 'components/login/UserPassword'
import { config } from 'config'
import { UserChangePassword } from 'interfaces/User'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { UserProps } from 'pages/_app'
import { SubmitHandler } from 'react-hook-form'

interface Props extends UserProps {
  loginUrl: string
}

const PasswordPage: NextPage<Props> = ({ user }) => {
  const { t } = useTranslation('user')
  const router = useRouter()
  const onSubmitRegister: SubmitHandler<UserChangePassword> = async values => {
    await axios.post<string>(config.login.POST_line_register, values)
    router.push('/user')
  }

  return (
    <PageLayout title={t('register')}>
      <Navbar user={user} />

      <Center h="80vh">
        <UserPassword onSubmitRegister={onSubmitRegister} />
      </Center>
    </PageLayout>
  )
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'user'])),
  },
})

export default PasswordPage
