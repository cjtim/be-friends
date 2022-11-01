import { Center, Heading } from '@chakra-ui/react'
import { AxiosResponse } from 'axios'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import PetRegisterCard from 'components/pets/RegisterCard'
import { config } from 'config'
import { Pet, PetImageResponse, PetRegister } from 'interfaces/Pet'
import { Tag } from 'interfaces/Tag'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { UserProps } from 'pages/_app'
import { SubmitHandler } from 'react-hook-form'

interface Props {
  tags: Tag[]
}

const PetNewPage: NextPage<UserProps & Props> = ({ user, tags }) => {
  const router = useRouter()
  const onSubmit: SubmitHandler<PetRegister> = async data => {
    const { data: pet } = await axios.post<Pet>(config.pet.POST_create, data)
    if (data.images) {
      const downloadURLPromises: Promise<AxiosResponse<PetImageResponse, any>>[] = []
      // eslint-disable-next-line no-restricted-syntax
      for (const img of data.images) {
        const formData = new FormData()
        formData.append('file', img, img.name)
        const resp = axios.postForm<PetImageResponse>(config.pet.POST_img, formData, { params: { id: pet.id } })
        downloadURLPromises.push(resp)
      }
      await Promise.all(downloadURLPromises)
    }
    router.push(`/pets/${pet.id}`)
  }
  return (
    <PageLayout title="New pet">
      <Navbar user={user} />
      <Center flexDir="column" gap={2} p={4}>
        <Heading>ลงทะเบียนสัตว์เลี้ยง</Heading>
        <PetRegisterCard onSubmitRegister={onSubmit} tags={tags} defaultValues={{ lat: user?.lat, lng: user?.lng }} />
      </Center>
    </PageLayout>
  )
}

export const getServerSideProps = AuthGetServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const { data: tags } = await axios.get<Tag[]>(config.tag.GET_list)

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      tags: tags || [],
    },
  }
})

export default PetNewPage
