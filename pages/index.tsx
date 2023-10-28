import { Divider } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import Hero1 from 'components/home/Hero1'
import type { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { UserProps } from './_app'

interface Props extends UserProps {}

const Home: NextPage<Props> = ({ user }) => {
  const { t } = useTranslation('index')

  return (
    <PageLayout title={t('title')}>
      <Navbar user={user} />

      <Hero1 />
      <Divider />
    </PageLayout>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'us', ['index', 'common'])),
      // Will be passed to the page component as props
    },
  }
}

export default Home
