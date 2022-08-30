import { Flex } from '@chakra-ui/react'
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

const PetDetails: NextPage<UserProps & Props> = ({ pet }) => (
  <PageLayout title={`Pet ${pet?.name}`}>
    <Flex>
      Name: {pet?.name}
      {JSON.stringify(pet)}
    </Flex>
  </PageLayout>
)

export const getServerSideProps = AuthGetServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const petId: string = (ctx.query && (ctx.query.pet_id as string)) || '0'
  const { data: pet } = await axios.get<Pet[]>(config.pet.GET_details.replace(':pet_id', petId))
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      pet,
    },
  }
})

export default PetDetails
