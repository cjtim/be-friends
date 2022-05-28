import { User } from 'interfaces/User'
import { AuthGetServerSideProps } from 'libs/auth'

import { NextPage } from 'next'
import Image from 'next/image'

const User: NextPage<{ user: User }> = ({ user }) => (
  <>
    {JSON.stringify(user, null, 2)}
    {user?.profilePic} {user?.name}
    {user?.profilePic && <Image src={user?.profilePic} width="100px" height={'100px'} alt="user profile picture" />}
  </>
)

export const getServerSideProps = AuthGetServerSideProps()

export default User
