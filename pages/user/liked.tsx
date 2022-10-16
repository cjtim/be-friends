import { Center, Heading } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { config } from 'config'
import { Liked } from 'interfaces/liked'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { UserProps } from 'pages/_app'

const PetsStatusTable = dynamic(() => import('components/pets/PetsStatusTable'), { ssr: false })

interface Props {
  pets: Liked[]
}

const UserLikedPage: NextPage<UserProps & Props> = ({ user, pets }) => {
  const router = useRouter()
  const onClickUnlike = async (id: number) => {
    await axios.delete(config.like.DELETE_delete.replace(':pet_id', id.toString()))
    router.replace(router.asPath)
  }

  return (
    <PageLayout title="Liked pets">
      <Navbar user={user} />

      <Center flexDir="column" gap={2} p={4}>
        <Heading>สัตว์ที่ถูกใจ</Heading>
        <PetsStatusTable pets={pets} onClickUnlike={onClickUnlike} />
      </Center>
    </PageLayout>
  )
}
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
