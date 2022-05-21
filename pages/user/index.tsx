import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { PrismaClient } from '@prisma/client'
import { GetServerSidePropsContext, NextPage } from 'next'
import Image from 'next/image'
import axios from '../../lib/axios'

const User: NextPage<{ user: UserProfile; users: any[] }> = withPageAuthRequired(({ user, users }) => (
  <>
    {JSON.stringify(users, null, 2)}
    {user?.email} {user?.name} {user?.nickname} {user?.org_id}
    {user?.picture && <Image src={user?.picture} width="100px" height={'100px'} alt="user profile picture" />}
  </>
))

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const prisma = new PrismaClient()
  const users = await prisma.user.findMany()
  await prisma.$disconnect()
  return {
    props: {
      users,
    },
  }
}

export default User
