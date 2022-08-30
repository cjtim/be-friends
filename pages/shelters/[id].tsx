import { Flex } from '@chakra-ui/react'
import PageLayout from 'components/global/PageLayout'
import { config } from 'config'
import { User } from 'interfaces/User'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'

interface Props {
  shelter: User
}

const ShelterDetails: NextPage<UserProps & Props> = ({ shelter }) => (
  <PageLayout title={`Shelter ${shelter?.name}`}>
    <Flex>
      Name: {shelter?.name}
      {JSON.stringify(shelter)}
    </Flex>
  </PageLayout>
)

export const getServerSideProps = AuthGetServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const shelterId: string = (ctx.query && (ctx.query.pet_id as string)) || '0'
  const { data: shelter } = await axios.get<User>(config.shelter.GET_list.replace(':id', shelterId), {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  })
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      shelter,
    },
  }
})

export default ShelterDetails
