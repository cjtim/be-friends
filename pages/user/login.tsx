import { Center } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import LineLoginButton from 'components/login/LineLoginButton'
import { getLoginLink } from 'libs/auth'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { BaseNextProps } from 'pages/_app'

interface Props extends BaseNextProps {
  loginUrl: string
}

const UserLogin: NextPage<Props> = ({ loginUrl, user }) => {
  const onClick = async () => {
    window.location.href = loginUrl
  }
  return (
    <PageLayout title="Login">
      <Navbar user={user} />
      <Center pt="40vh">
        <LineLoginButton onClick={onClick} />
      </Center>
    </PageLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common'])),
      loginUrl: await getLoginLink(ctx.req.headers.host || 'localhost:3000'),
    },
  }
}

export default UserLogin
