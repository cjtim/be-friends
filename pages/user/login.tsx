import { Center } from '@chakra-ui/react'
import LineLoginButton from 'components/login/LineLoginButton'
import { getLoginLink } from 'libs/auth'
import { NextPage } from 'next'

const UserLogin: NextPage = () => {
  const onClick = async () => {
    window.location.href = await getLoginLink()
  }
  return (
    <Center top="50%">
      <LineLoginButton onClick={onClick} />
    </Center>
  )
}

export default UserLogin
