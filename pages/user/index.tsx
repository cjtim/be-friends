import { Box, Stack, Text } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { AuthGetServerSideProps } from 'libs/auth'

import { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import NextImage from 'next/image'
import { BaseNextProps } from 'pages/_app'

const User: NextPage<BaseNextProps> = ({ user }) => (
  <PageLayout title="User Profile">
    <Navbar user={user} />
    <Stack>
      <Text>ID: {user?.id}</Text>
      <Text>IMAGE: {user?.picture_url}</Text>
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
  </PageLayout>
)

export const getServerSideProps = AuthGetServerSideProps(async ctx => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common'])),
    },
  }
})

export default User
