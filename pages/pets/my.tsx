import { AddIcon } from '@chakra-ui/icons'
import { Button, Center, Heading } from '@chakra-ui/react'
import ButtonLink from 'components/global/ButtonLink'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { config, internalPages } from 'config'
import { Pet } from 'interfaces/Pet'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { UserProps } from 'pages/_app'

const PetsTable = dynamic(import('components/pets/PetsTable'), { ssr: false })

interface Props {
  pets: Pet[]
}

const MyPetHome: NextPage<UserProps & Props> = ({ user, pets }) => (
  <PageLayout title="สัตว์เลี้ยงของฉัน">
    <Navbar user={user} />

    <Center flexDir="column" p="4" gap={4}>
      <Heading>สัตว์เลี้ยงของฉัน</Heading>
      <Center py={2}>
        <ButtonLink href={internalPages.pets.new} isExternal>
          <Button colorScheme="brand" color="white" leftIcon={<AddIcon />}>
            เพิ่มสัตว์เลี้ยง
          </Button>
        </ButtonLink>
      </Center>
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
