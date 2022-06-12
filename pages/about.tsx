import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from './_app'

const AboutPage: NextPage<UserProps> = ({ user }) => (
  <PageLayout title="About us">
    <Navbar user={user} />
  </PageLayout>
)

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'us', ['common'])),
      // Will be passed to the page component as props
    },
  }
}

export default AboutPage
