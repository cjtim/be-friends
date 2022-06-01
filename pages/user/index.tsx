import { Box, Stack, Text } from '@chakra-ui/react'
import { User } from 'interfaces/User'
import { AuthGetServerSideProps } from 'libs/auth'

import { NextPage } from 'next'
import NextImage from 'next/image'

const User: NextPage<{ user: User }> = ({ user }) => (
  <Stack>
    <Text>ID: {user.id}</Text>
    <Text>IMAGE: {user.picture_url}</Text>
    <Text>NAME: {user?.name}</Text>
    {user?.picture_url && (
      <Box position={'relative'}>
        <NextImage
          src={user?.picture_url}
          width="100px"
          height="100px"
          alt="user profile picture"
          style={{ borderRadius: '50%' }}
        />
      </Box>
    )}
  </Stack>
)

export const getServerSideProps = AuthGetServerSideProps()

export default User
