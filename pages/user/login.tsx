import { Center } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import LineLoginButton from 'components/login/LineLoginButton'
import { User } from 'interfaces/User'
import { getLoginLink, getUser } from 'libs/auth'
import { GetServerSidePropsContext, NextPage } from 'next'

interface Props {
  loginUrl: string
  user?: User
}

const UserLogin: NextPage<Props> = ({ loginUrl, user }) => {
  const onClick = async () => {
    window.location.href = loginUrl
  }
  return (
    <PageLayout title="Login">
      <Navbar user={user} />
      <Center top="50%">
        <LineLoginButton onClick={onClick} />
      </Center>
    </PageLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      loginUrl: await getLoginLink(),
      user: await getUser(ctx),
    },
  }
}

export default UserLogin
