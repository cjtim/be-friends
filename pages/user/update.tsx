import { Center } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import UserUpdateCard from 'components/login/UserUpdateCard'
import { config } from 'config'
import { User } from 'interfaces/User'
import axios from 'libs/axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { UserProps } from 'pages/_app'
import { SubmitHandler } from 'react-hook-form'

const UserUpdate: NextPage<UserProps> = ({ user }) => {
  const router = useRouter()
  const onSubmitRegister: SubmitHandler<User> = async values => {
    await axios.post<string>(config.auth.POST_update, values)
    router.back()
  }

  return (
    <PageLayout title="แก้ไขบัญชี">
      <Navbar user={user} />

      <Center h="80vh">{user && <UserUpdateCard user={user} onSubmitRegister={onSubmitRegister} />}</Center>
    </PageLayout>
  )
}

export default UserUpdate
