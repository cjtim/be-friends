import { Flex } from '@chakra-ui/react'
import { getLoginLink } from 'libs/auth'
import { NextPage } from 'next'
import Image from 'next/image'

const UserLogin: NextPage = () => {
  const onClick = async () => {
    window.location.href = await getLoginLink()
  }
  return (
    <Flex onClick={onClick}>
      <Image src={'/logo/line_btn_login_base.png'} alt="login with line" width="303" height="88" />
    </Flex>
  )
}

export default UserLogin
