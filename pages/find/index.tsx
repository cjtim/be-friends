import { Box, Flex } from '@chakra-ui/react'
import GGMap from 'components/ggmap/GGMap'
import GGMAPInfo from 'components/ggmap/GGMAPInfo'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import PetMiniDetailCard from 'components/pet/PetMiniDetailCard'
import { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'

const data: typeof GGMap.defaultProps = {
  markers: Array(200)
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

    <Flex w="100vw" h="100vh">
      <Box w="20%" overflowY="scroll">
        {data.markers?.map(marker => (
          <PetMiniDetailCard
            key={marker.id}
            title={marker.title}
            id={marker.id}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKr5wT7rfkjkGvNeqgXjBmarC5ZNoZs-H2uMpML8O7Q4F9W-IlUQibBT6IPqyvX45NOgw&usqp=CAU"
          />
        ))}
      </Box>
      <Box w="79%">{data.markers && <GGMap markers={data.markers} />}</Box>
    </Flex>
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
