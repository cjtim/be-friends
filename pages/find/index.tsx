import { Box } from '@chakra-ui/react'
import GGMap from 'components/ggmap/GGMap'
import GGMAPInfo from 'components/ggmap/GGMAPInfo'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import PetMiniDetailCard from 'components/pet/PetMiniDetailCard'
import { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'

const data: typeof GGMap.defaultProps = {
  markers: [
    {
      lat: 13.78366267529092,
      lng: 100.53947827076848,
      id: 'test',
      title: 'น้องขุนทอง',
      content: (
        <GGMAPInfo id="test" title="น้องขุนทอง">
          Test
        </GGMAPInfo>
      ),
    },
    {
      lat: 16.41958300934828,
      lng: 100.75256909753664,
      id: 'test2',
      title: 'น้องทองม่วง',
      content: (
        <GGMAPInfo id="test2" title="น้องทองม่วง">
          Test2
        </GGMAPInfo>
      ),
    },
  ],
}

const FindPage: NextPage<UserProps> = ({ user }) => (
  <PageLayout title="Find friends">
    <Navbar user={user} />

    <Box w="100vw" h="100vh">
      {data.markers && <GGMap markers={data.markers} />}
    </Box>

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
