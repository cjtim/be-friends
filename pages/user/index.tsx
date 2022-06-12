import { Center } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import UserInfo from 'components/login/UserInfo'
import { AuthGetServerSideProps } from 'libs/auth'

import { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'

const User: NextPage<UserProps> = ({ user }) => (
  <PageLayout title="User Profile">
    <Navbar user={user} />
    <Center h="80vh">{user && <UserInfo user={user} />}</Center>
  </PageLayout>
)

export const getServerSideProps = AuthGetServerSideProps(async ctx => ({
  props: {
    ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'user'])),
  },
}))

export default User
