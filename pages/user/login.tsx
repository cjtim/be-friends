import { Center } from '@chakra-ui/react'
import LineLoginButton from 'components/login/LineLoginButton'
import { getLoginLink } from 'libs/auth'
import { NextPage } from 'next'

const UserLogin: NextPage<{ loginUrl: string }> = ({ loginUrl }) => {
  const onClick = async () => {
    window.location.href = loginUrl
  }
  return (
    <Center top="50%">
      <LineLoginButton onClick={onClick} />
    </Center>
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
