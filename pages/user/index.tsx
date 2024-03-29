import { Center } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import UserInfo from 'components/login/UserInfo'
import { AuthGetServerSideProps } from 'libs/auth'

import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { UserProps } from 'pages/_app'

const User: NextPage<UserProps> = ({ user }) => {
  const { t } = useTranslation('common')

  return (
    <PageLayout title={t('navbar.profile')}>
      <Navbar user={user} />
      <Center>{user && <UserInfo user={user} />}</Center>
    </PageLayout>
  )
}

export const getServerSideProps = AuthGetServerSideProps()

export default User
