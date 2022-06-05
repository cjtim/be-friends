import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { NextPage } from 'next'
import { BaseNextProps } from 'pages/_app'

const FindPage: NextPage<BaseNextProps> = ({ user }) => {
  return (
    <PageLayout title="Find friends">
      <Navbar user={user} />
    </PageLayout>
  )
}

export default FindPage
