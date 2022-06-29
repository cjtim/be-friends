import PetsMap from 'components/PetsMap'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'
import PetMiniDetailCard from 'components/PetsMap/PetMiniDetailCard'

const data: typeof PetsMap.defaultProps = {
  markers: Array(50)
    .fill(null)
    .map((_, idx) => ({
      lat: 16.41958300934828,
      lng: 100.75256909753664 + idx + 10,
      title: `test${idx}`,
      SideContent: ({ onClick }) => (
        <PetMiniDetailCard
          id={`test${idx}`}
          image="https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png"
          title={`test${idx}`}
          onClick={onClick}
          imageAlt={`test${idx}`}
        />
      ),
      MarkerContent: `
      <div class="chakra-text">
      <h1>test${idx}</h1>
      <button onclick=" window.open('/pets/${idx}','_blank')">
        More info
      </button>
      </div>
      `,
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
