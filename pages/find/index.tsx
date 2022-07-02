import PetsMap from 'components/PetsMap'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'
import PetMiniDetailCard from 'components/PetsMap/PetMiniDetailCard'
import { useTranslation } from 'next-i18next'
import { Pet } from 'interfaces/Pet'
import axios from 'libs/axios'
import { config } from 'config'

interface Props extends UserProps {
  rawPets: Pet[]
}

const FindPage: NextPage<Props> = ({ user, rawPets }) => {
  const data: typeof PetsMap.defaultProps = {
    markers: rawPets.map(pet => ({
      ...pet,
      // eslint-disable-next-line react/no-unstable-nested-components
      SideContent: ({ onClick }) => (
        <PetMiniDetailCard
          id={`${pet.id}`}
          image="https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png"
          title={pet.name}
          onClick={onClick}
          imageAlt={pet.name}
        />
      ),
      MarkerContent: `
      <div class="chakra-text">
      <h1>${pet.name}</h1>
      <button onclick=" window.open('/pets/${pet.id}','_blank')">
        More info
      </button>
      </div>
      `,
    })),
  }
  const { t } = useTranslation('common')
  return (
    <PageLayout title={t('navbar.findPets')}>
      <Navbar user={user} />
      {data && data.markers && <PetsMap markers={data.markers} />}
    </PageLayout>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const { data: rawPets } = await axios.get<Pet[]>(config.pet.GET_list)
  return {
    props: {
      ...(await serverSideTranslations(locale || 'us', ['common', 'index', 'pet'])),
      // Will be passed to the page component as props
      rawPets,
    },
  }
}

export default FindPage
