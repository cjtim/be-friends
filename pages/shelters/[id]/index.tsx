import { Button, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import ButtonLink from 'components/global/ButtonLink'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import TextLink from 'components/global/TextLink'
import UserImg from 'components/global/UserImg'
import { config } from 'config'
import { Pet } from 'interfaces/Pet'
import { User } from 'interfaces/User'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { UserProps } from 'pages/_app'

const PetTableList = dynamic(() => import('components/pets/PetsTable'), { ssr: false })

interface Props {
  shelter: User
  pets: Pet[]
}

const ShelterDetails: NextPage<UserProps & Props> = ({ user, shelter, pets }) => (
  <PageLayout title={`Shelter: ${shelter?.name}`}>
    <Navbar user={user} />
    <Center flexDir="column" p={4}>
      <Stack>
        {/* LINE1 */}
        <Flex w="container.xl" alignItems="center">
          <UserImg user={shelter} />
          <Heading>{shelter?.name}</Heading>
          <Flex marginLeft="auto">
            <ButtonLink href={`/shelters/${shelter.id}`}>
              <Button>Contact</Button>
            </ButtonLink>
          </Flex>
        </Flex>

        {/* DETAILS */}
        <Stack>
          <TextLink title={shelter.email} to={`mailto:${shelter.email}`} text={`Email: ${shelter.email}` || '-'} />
          <Text>Phone: {shelter.phone || '-'}</Text>
          <Text>
            <>Joined when: {shelter.created_at}</>
          </Text>
        </Stack>
      </Stack>
    </Center>
    {pets ? <PetTableList pets={pets} /> : 'Empty pets'}
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
      shelter: shelter || [],
      pets: pets || [],
    },
  }
})

export default ShelterDetails
