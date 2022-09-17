import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import PetsTable from 'components/pets/PetsTable'
import { config } from 'config'
import { Liked } from 'interfaces/liked'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'

interface Props {
  pets: Liked[]
}

const UserLikedPage: NextPage<UserProps & Props> = ({ user, pets }) => (
  <PageLayout title="Liked pets">
    <Navbar user={user} />
    <PetsTable pets={pets} />
  </PageLayout>
)

export const getServerSideProps = AuthGetServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const { data: pets } = await axios.get<Liked[]>(config.like.GET_list, {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  })
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      pets: pets || [],
    },
  }
})

export default UserLikedPage
