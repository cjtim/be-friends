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
  pet: Pet
  tags: Tag[]
}

const PetUpdate: NextPage<UserProps & Props> = ({ user, pet, tags }) => {
  const router = useRouter()
  const onSubmit: SubmitHandler<PetRegister> = async data => {
    await axios.put<Pet>(config.pet.PUT_update, data)

    // TODO: able to delete existing image
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
    <PageLayout title={`Update pet - ${pet.name}`}>
      <Navbar user={user} />
      <Center flexDir="column" gap={2} p={4}>
        <Heading>Update details</Heading>
        <PetRegisterCard onSubmitRegister={onSubmit} tags={tags} defaultValues={pet} isUpdate />
      </Center>
    </PageLayout>
  )
}

export const getServerSideProps = AuthGetServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const petId: string = (ctx.query && (ctx.query.pet_id as string)) || '0'
  const { data: pet } = await axios.get<Pet>(config.pet.GET_details.replace(':pet_id', petId), {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  })
  const { data: tags } = await axios.get<Tag[]>(config.tag.GET_list)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      pet,
      tags: tags || [],
    },
  }
})

export default PetUpdate
