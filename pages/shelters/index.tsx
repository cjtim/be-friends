import { Center, Container, Heading } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { config } from 'config'

import { User } from 'interfaces/User'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { UserProps } from 'pages/_app'

const ShelterTableList = dynamic(() => import('components/shelters/TableList'))

interface Props extends UserProps {
  shelters: User[]
}

const SheltersPage: NextPage<Props> = ({ user, shelters }) => {
  const { t } = useTranslation(['common'])

  return (
    <PageLayout title={t('navbar.shelters')}>
      <Navbar user={user} />

      <Container minW="container.lg">
        <Center py={2}>
          <Heading>Shelters</Heading>
        </Center>
        <ShelterTableList shelters={shelters} />
      </Container>
    </PageLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { data: shelters } = await axios.get<User[]>(config.shelter.GET_list)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      shelters: shelters || [],
    },
  }
}

export default SheltersPage
