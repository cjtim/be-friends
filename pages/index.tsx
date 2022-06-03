import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { User } from 'interfaces/User'
import { getUser } from 'libs/auth'
import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next'

interface Props {
  user?: User
}

const Home: NextPage<Props> = ({ user }) => {
  return (
    <PageLayout title="Home Page">
      <Navbar user={user} />
    </PageLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  try {
    return {
      props: {
        user: await getUser(ctx),
      },
    }
  } catch (e) {
    return {
      props: {},
    }
  }
}

export default Home
