import { Box, Flex, Heading, Stack, Tag, Text } from '@chakra-ui/react'
import Gallery from 'components/global/Gallery'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { config } from 'config'
import { Pet } from 'interfaces/Pet'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'

interface Props {
  pet: Pet
}

const PetDetails: NextPage<UserProps & Props> = ({ user, pet }) => (
  <PageLayout title={`Pet ${pet?.name}`}>
    <Navbar user={user} />
    <Flex borderRadius="2xl">
      <Box boxSize="2lg" mt={2}>
        <Gallery
          imgs={pet?.picture_urls?.map(img => ({
            original: img.picture_url,
            thumbnail: img.picture_url,
          }))}
        />
      </Box>
      <Flex p={4}>
        <Stack>
          <Flex alignItems="center" gap={4}>
            <Heading>{pet.name} </Heading>
            <Tag textTransform="uppercase">{pet.status}</Tag>
          </Flex>
          <Text>Description: {pet.description}</Text>
          <Text>
            <>Founded when: {pet.created_at}</>
          </Text>
          <iframe
            title="pet-location"
            style={{
              border: 0,
            }}
            width="600"
            height="450"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed/v1/place?q=18.4151646%2C99.1747807&key="
          />
        </Stack>
      </Flex>
    </Flex>
  </PageLayout>
)

export const getServerSideProps = AuthGetServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const petId: string = (ctx.query && (ctx.query.pet_id as string)) || '0'
  const { data: pet } = await axios.get<Pet>(config.pet.GET_details.replace(':pet_id', petId), {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  })
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      pet,
    },
  }
})

export default PetDetails
