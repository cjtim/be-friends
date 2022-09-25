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
import { ParseDateTime } from 'libs/date'
import { GetServerSidePropsContext, NextPage } from 'next'
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
        <Flex w="container.xl" alignItems="center" gap={2}>
          <UserImg user={shelter} />
          <Heading>{shelter?.name}</Heading>
          <Flex marginLeft="auto">
            <ButtonLink href={`/shelters/${shelter.id}`}>
              <Button>Contact</Button>
            </ButtonLink>
          </Flex>
        </Flex>
        DETAILS
        <Stack>
          <Flex>
            <Text>อีเมล </Text>
            <TextLink title={shelter.email} to={`mailto:${shelter.email}`} text={`${shelter.email}` || '-'} />
          </Flex>

          <Flex>
            <Text>โทรศัพท์ </Text>
            <Text color="gray"> {shelter.phone || '-'}</Text>
          </Flex>

          <Text>เป็นสมาชิกเมื่อ {createdAt}</Text>
        </Stack>
        {/* TABLE */}
        <Stack w="container.xl">
          <Text fontWeight="bold">สัตว์เลี้ยงของผู้ใช้นี้</Text>
          {pets ? <PetTableList pets={pets} /> : 'ไม่พบสัตว์เลี้ยงของผู้ใช้นี้'}
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
    },
  }
})

export default ShelterDetails