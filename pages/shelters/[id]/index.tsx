import { Center, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import StaticMap from 'components/global/StaticMap'
import TextLink from 'components/global/TextLink'
import UserImg from 'components/global/UserImg'
import { config } from 'config'
import { Pet } from 'interfaces/Pet'
import { User } from 'interfaces/User'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { ParseDateTime } from 'libs/date'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { UserProps } from 'pages/_app'

const PetTableList = dynamic(() => import('components/pets/PetsTable'), { ssr: false })

interface Props {
  shelter: User
  pets: Pet[]
  createdAt: string
}

const ShelterDetails: NextPage<UserProps & Props> = ({ user, shelter, pets, createdAt }) => (
  <PageLayout title={`Shelter: ${shelter?.name}`}>
    <Navbar user={user} />
    <Center flexDir="column" p={4}>
      <Stack>
        {/* LINE1 */}
        <Flex>
          <Stack>
            <Flex alignItems="center" gap={2}>
              <UserImg user={shelter} />
              <Heading>{shelter?.name}</Heading>
            </Flex>
            <SimpleGrid columns={2} spacing={1} h="auto">
              <Text>Description</Text>
              <Text>{shelter.description || '-'}</Text>
              <Text>Email</Text>
              <TextLink title={shelter.email} to={`mailto:${shelter.email}`} text={`${shelter.email}` || '-'} />

              <Text>Phone </Text>
              <Text color="gray"> {shelter.phone || '-'}</Text>

              <Text>Member since </Text>
              <Text color="gray">{createdAt}</Text>
            </SimpleGrid>
          </Stack>

          {shelter.lat && shelter.lng && (
            <Flex w="xl" h="sm" marginLeft="auto">
              <StaticMap lat={shelter.lat} lng={shelter.lng} />
            </Flex>
          )}
        </Flex>
        {/* TABLE */}
        <Stack w="container.xl">
          <Text fontWeight="bold">Pets</Text>
          {pets ? <PetTableList pets={pets} /> : 'No pet registered under this user'}
        </Stack>
      </Stack>
    </Center>
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
      shelter: shelter || {},
      pets: pets || [],
      createdAt: ParseDateTime(shelter.created_at),
      ...(await serverSideTranslations(ctx.locale || 'us', ['index', 'common'])),
    },
  }
})

export default ShelterDetails
