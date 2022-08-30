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
  pets: Pet[]
}

const PetHome: NextPage<UserProps & Props> = ({ pets }) => (
  <PageLayout title="Pet home">
    <Flex>
      Pet home
      {JSON.stringify(pets)}
    </Flex>
  </PageLayout>
)

export const getServerSideProps = AuthGetServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const { data: pets } = await axios.get<Pet[]>(config.pet.GET_list, {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  })
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      pets,
    },
  }
})

export default PetHome
