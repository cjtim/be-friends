import { User } from 'interfaces/User'
import { AuthGetServerSideProps } from 'libs/auth'

import { NextPage } from 'next'
import Image from 'next/image'

const User: NextPage<{ user: User }> = ({ user }) => (
  <>
    ID: {user.id}
    IMAGE: {user.profilePic}
    NAME: {user?.name}
    {user?.profilePic && <Image src={user?.profilePic} width="100px" height={'100px'} alt="user profile picture" />}
  </>
)

export const getServerSideProps = AuthGetServerSideProps()

export default User
