import { Center, Container, Flex, Heading, Switch, Text } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import { config } from 'config'

import { User } from 'interfaces/User'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { UserProps } from 'pages/_app'

const ShelterTableList = dynamic(() => import('components/shelters/TableList'))

interface Props extends UserProps {
  shelters: User[]
}

const SheltersPage: NextPage<Props> = ({ user, shelters }) => {
  const router = useRouter()
  const includeUser = router.query.include_user
  const title = includeUser ? 'สถานสงเคราะห์สัตว์ และผู้ใข้ทั่วไป' : 'สถานสงเคราะห์สัตว์'

  const toggleIncludeUser = (newIncludeUser: boolean) => {
    if (newIncludeUser) {
      router.query.include_user = 'true'
    } else {
      delete router.query.include_user
    }
    router.push(router)
  }

  return (
    <PageLayout title={title}>
      <Navbar user={user} />

      <Container minW="container.lg">
        <Center py={2} gap={2} flexDir="column">
          <Heading>{title}</Heading>
          <Flex gap={2} alignItems="center">
            <Text>แสดงบัญชีผู้ใช้ทั่วไป</Text>
            <Switch
              onChange={e => toggleIncludeUser(e.target.checked)}
              isChecked={Boolean(router.query.include_user)}
            />
          </Flex>
        </Center>
        <ShelterTableList shelters={shelters} />
      </Container>
    </PageLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { data: shelters } = await axios.get<User[]>(config.shelter.GET_list, {
    params: {
      include_user: ctx.query.include_user,
    },
  })
  return {
    props: {
      shelters: shelters || [],
    },
  }
}

export default SheltersPage
