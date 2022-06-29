import PetsMap from 'components/PetsMap'
import GGMAPInfo from 'components/PetsMap/GGMAPInfo'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'

const data: typeof PetsMap.defaultProps = {
  markers: Array(50)
    .fill(null)
    .map((_, idx) => ({
      lat: 16.41958300934828,
      lng: 100.75256909753664 + idx + 10,
      id: `test${idx}`,
      title: `test${idx}`,
      content: (
        <GGMAPInfo id={`test${idx}`} title={`test${idx}`}>
          Test2
        </GGMAPInfo>
      ),
    })),
}

const FindPage: NextPage<UserProps> = ({ user }) => (
  <PageLayout title="Find friends">
    <Navbar user={user} />

    {data.markers && <PetsMap markers={data.markers} />}
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
