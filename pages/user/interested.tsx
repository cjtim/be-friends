import { Flex } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { config } from 'config'
import { Interested } from 'interfaces/interested'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'

interface Props {
  pets: Interested[]
}

const UserInterestedPage: NextPage<UserProps & Props> = ({ user, pets }) => (
  <PageLayout title="Interested pets">
    <Navbar user={user} />
    <Flex>{JSON.stringify(pets)}</Flex>
  </PageLayout>
)

export const getServerSideProps = AuthGetServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const { data: pets } = await axios.get<Interested[]>(config.interest.GET_list, {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  })
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      pets: pets || [],
    },
  }
})

export default UserInterestedPage
