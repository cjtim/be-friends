import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import ButtonLink from 'components/global/ButtonLink'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import TextLink from 'components/global/TextLink'
import PetsTable from 'components/pets/PetsTable'
import { config } from 'config'
import { Pet } from 'interfaces/Pet'
import { User } from 'interfaces/User'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'

interface Props {
  shelter: User
  pets: Pet[]
}

const ShelterDetails: NextPage<UserProps & Props> = ({ user, shelter, pets }) => (
  <PageLayout title={`Shelter: ${shelter?.name}`}>
    <Navbar user={user} />
    <Stack p={4}>
      <Flex>
        <Heading>{shelter?.name}</Heading>
        <Flex marginLeft="auto">
          <ButtonLink href={`/shelters/${shelter.id}`}>
            <Button>Contact</Button>
          </ButtonLink>
        </Flex>
      </Flex>

      <Stack>
        <TextLink title={shelter.email} to={`mailto:${shelter.email}`} text={`Email: ${shelter.email}` || '-'} />
        <Text>Phone: {shelter.phone || '-'}</Text>
        <Text>
          <>Joined when: {shelter.created_at}</>
        </Text>
      </Stack>
    </Stack>

    <Stack>{pets ? <PetsTable pets={pets} /> : 'Empty pets'}</Stack>
  </PageLayout>
)

export const getServerSideProps = AuthGetServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const shelterId: string = (ctx.query && (ctx.query.id as string)) || '0'
  const { data: shelter } = await axios.get<User>(config.shelter.GET_details.replace(':id', shelterId), {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  })
  const { data: pets } = await axios.get<Pet[]>(config.pet.GET_list, {
    params: {
      user_id: shelterId,
    },
  })
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      shelter,
      pets,
    },
  }
})

export default ShelterDetails
