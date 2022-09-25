import { StarIcon } from '@chakra-ui/icons'
import { Box, Button, Divider, Flex, Heading, Stack, Tag, Text, Tooltip } from '@chakra-ui/react'
import Gallery from 'components/global/Gallery'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import StaticMap from 'components/global/StaticMap'
import TextLink from 'components/global/TextLink'
import UserImg from 'components/global/UserImg'
import PetStatusTag from 'components/pets/PetStatusTag'
import { config, internalPages } from 'config'
import { Pet } from 'interfaces/Pet'
import { User } from 'interfaces/User'
import { AuthGetServerSideProps } from 'libs/auth'
import axios from 'libs/axios'
import { ParseDateTime } from 'libs/date'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { UserProps } from 'pages/_app'

interface Props {
  pet: Pet
  shelter: User
  createdAt?: string
}

const PetDetails: NextPage<UserProps & Props> = ({ user, pet, shelter, createdAt }) => {
  const router = useRouter()
  const isLiked = pet?.liked?.find(userId => userId === user?.id)
  const isInterested = pet?.interested?.find(userId => userId === user?.id)
  const onClickLike = async () => {
    if (isLiked) {
      await axios.delete(config.like.DELETE_delete.replace(':pet_id', pet.id.toString()))
    } else {
      await axios.post(config.like.POST_add.replace(':pet_id', pet.id.toString()))
    }
    router.replace(router.asPath)
  }

  const onClickInterested = async () => {
    if (isInterested) {
      await axios.delete(config.interest.DELETE_delete.replace(':pet_id', pet.id.toString()))
    } else {
      await axios.post(config.interest.POST_add.replace(':pet_id', pet.id.toString()))
    }
    router.replace(router.asPath)
  }
  return (
    <PageLayout title={`Pet ${pet?.name}`}>
      <Navbar user={user} />
      <Flex borderRadius="2xl">
        <Box mt={2} w="40vw">
          <Gallery
            imgs={pet?.picture_urls?.map(img => ({
              original: img.picture_url,
              thumbnail: img.picture_url,
            }))}
          />
        </Box>
        <Stack p={4} w="60vw">
          <Flex alignItems="center" gap={4}>
            <Heading>{pet.name} </Heading>
            <PetStatusTag status={pet.status} />
            <Flex marginLeft="auto" gap={4}>
              <Button colorScheme="blue" onClick={onClickLike} leftIcon={<StarIcon />}>
                {isLiked ? 'ยกเลิกถูกใจ' : 'ถูกใจ'}
              </Button>
              <Tooltip label="เมื่อรับอุปการะแล้วจะไม่สามารถยกเลิกได้" hasArrow>
                <Button colorScheme="yellow" onClick={onClickInterested} isDisabled={Boolean(isInterested)}>
                  {isInterested ? 'อยู่ในกระบวนการพิจารณาการอุปการะ' : 'สนใจรับอุปการะ'}
                </Button>
              </Tooltip>
            </Flex>
          </Flex>

          <Flex gap={2}>
            {pet.tags.map(tag => (
              <Tooltip label={tag.description} key={tag.id}>
                <Tag>{tag.name}</Tag>
              </Tooltip>
            ))}
          </Flex>

          <Divider />

          <Flex gap={2} alignItems="center">
            <UserImg user={shelter} />
            <TextLink text={shelter.name} to={`${internalPages.shelters.index}/${shelter.id}`} title={shelter.name} />
          </Flex>
          <Divider />
          <Stack>
            <Text fontWeight="bold">รายละเอียด: </Text>
            <Text>{pet.description || '-'}</Text>
          </Stack>
          <Divider />

          <Text>พบเมื่อ {createdAt}</Text>

          <Flex w="100%" h="100%">
            <StaticMap lat={pet.lat} lng={pet.lng} />
          </Flex>
        </Stack>
      </Flex>
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
  const { data: shelter } = await axios.get<Pet>(config.shelter.GET_details.replace(':id', pet.user_id), {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  })
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
      pet,
      shelter,
      createdAt: ParseDateTime(pet.created_at),
    },
  }
})

export default PetDetails
