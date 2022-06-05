import { Center } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import LineLoginButton from 'components/login/LineLoginButton'
import { getLoginLink } from 'libs/auth'
import { NextPage } from 'next'
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

export const getServerSideProps = async () => {
  return {
    props: {
      loginUrl: await getLoginLink(),
    },
  }
}

export default UserLogin
