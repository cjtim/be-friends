import PetsMap from 'components/PetsMap'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'
import PetMiniDetailCard from 'components/PetsMap/PetMiniDetailCard'
import { useTranslation } from 'next-i18next'
import { Pet } from 'interfaces/Pet'
import axios from 'libs/axios'
import { config } from 'config'
import { Status } from 'interfaces/status'

interface Props extends UserProps {
  pets: Pet[]
}

const FindPage: NextPage<Props> = ({ user, pets }) => {
  const data: typeof PetsMap.defaultProps = {
    markers: pets.map(pet => ({
      ...pet,
      // eslint-disable-next-line react/no-unstable-nested-components
      SideContent: ({ onClick }) => <PetMiniDetailCard {...pet} onClick={onClick} />,
      MarkerContent: `
      <div>
        <header>
          <h1>${pet.name}</h1>
        </header>
        <img src="${
          pet?.picture_urls && pet?.picture_urls[0] && pet?.picture_urls[0]?.picture_url
        }" width="100" height="auto"/>
        <br/>
        <a>${pet?.description || ''}</a>
        <br/>
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { data: pets } = await axios.get<Pet[]>(config.pet.GET_list)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      pets: pets?.filter(pet => pet.status === Status.NEW) || [],
    },
  }
}

export default FindPage
