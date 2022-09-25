import { Center, Heading } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import PetsTable from 'components/pets/PetsTable'
import { config } from 'config'
import { Pet } from 'interfaces/Pet'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'

interface Props {
  pets: Pet[]
}

const MyPetHome: NextPage<UserProps & Props> = ({ user, pets }) => (
  <PageLayout title="สัตว์เลี้ยงของฉัน">
    <Navbar user={user} />

    <Center flexDir="column" p="4" gap={4}>
      <Heading>สัตว์เลี้ยงของฉัน</Heading>
      <PetsTable pets={pets} />
    </Center>
  </PageLayout>
)

export const getServerSideProps = AuthGetServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const { data: pets } = await axios.get<Pet[]>(config.pet.GET_my, {
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

export default MyPetHome
