import { Divider } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import Hero1 from 'components/home/Hero1'
import type { NextPage } from 'next'
import { UserProps } from './_app'

interface Props extends UserProps {}

const Home: NextPage<Props> = ({ user }) => (
  <PageLayout title="หน้าแรก">
    <Navbar user={user} />

    <Hero1 />
    <Divider />
  </PageLayout>
)

export default Home
