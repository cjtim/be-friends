import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import PetMiniDetailCard from 'components/pet/PetMiniDetailCard'
import { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'

const FindPage: NextPage<UserProps> = ({ user }) => (
  <PageLayout title="Find friends">
    <Navbar user={user} />

    <PetMiniDetailCard />
    <PetMiniDetailCard />
    <PetMiniDetailCard />
    <PetMiniDetailCard />
  </PageLayout>
)

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'us', ['common', 'index'])),
      // Will be passed to the page component as props
    },
  }
}

export default FindPage
