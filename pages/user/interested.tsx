import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { config } from 'config'
import { Interested } from 'interfaces/interested'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { UserProps } from 'pages/_app'

const InterestedTable = dynamic(() => import('components/pets/InterestedTable'), { ssr: false })

interface Props {
  pets: Interested[]
}

const UserInterestedPage: NextPage<UserProps & Props> = ({ user, pets }) => (
  <PageLayout title="Interested pets">
    <Navbar user={user} />

    <InterestedTable pets={pets} />
  </PageLayout>
)

export const getServerSideProps = AuthGetServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const { data: pets } = await axios.get<Interested[]>(config.interest.GET_list, {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  })
  return {
    props: {
      pets: pets || [],
    },
  }
})

export default UserInterestedPage
