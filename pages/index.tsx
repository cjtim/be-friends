import { Divider } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import Hero1 from 'components/home/Hero1'
import type { GetStaticPropsContext, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { UserProps } from './_app'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface Props extends UserProps {}

const Home: NextPage<Props> = ({ user }) => {
  const { t } = useTranslation('common')
  return (
    <PageLayout title={t('homePageTitle')}>
      <Navbar user={user} />

      <Hero1 />
      <Divider />
    </PageLayout>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'us', ['common', 'index'])),
    },
  }
}

export default Home
