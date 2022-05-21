import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPage } from 'next'
import Image from 'next/image'

export const getServerSideProps = withPageAuthRequired()

const User: NextPage<{ user: UserProfile }> = ({ user }) => (
  <>
    {user?.email} {user?.name} {user?.nickname} {user?.org_id}
    {user?.picture && <Image src={user?.picture} width="100px" height={'100px'} alt="user profile picture" />}
  </>
)

export default User
