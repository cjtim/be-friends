import { Avatar, AvatarBadge, Button, Center, Flex, Grid, GridItem, Img, Text } from '@chakra-ui/react'
import ButtonLink from 'components/global/ButtonLink'
import { User } from 'interfaces/User'
import { useTranslation } from 'next-i18next'

interface Props {
  user: User
}

const UserInfo: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation('user')
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2} w="lg" borderRadius="lg" border="1px" borderColor="gray" p={4}>
      <GridItem colSpan={4}>
        <Center flexDir="column" gap={4}>
          {user && user.picture_url && <Img src={user.picture_url || ''} borderRadius="full" w="24" />}
          {user && !user.picture_url && (
            <Avatar borderRadius="full" size="lg">
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          )}
          <Text fontSize="2xl">{user?.name}</Text>
          <Flex gap={4}>
            <ButtonLink href="/user/update">
              <Button>เเก้ไขข้อมูล</Button>
            </ButtonLink>
            <ButtonLink href="/user/password">
              <Button colorScheme="red" variant="outline">
                เปลี่ยนรหัสผ่าน
              </Button>
            </ButtonLink>
          </Flex>
        </Center>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>{t('id')}</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text>{user?.id}</Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>{t('email')}</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text>{user?.email || '-'}</Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>Description</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text>{user?.description || '-'}</Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>Phone</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text>{user?.phone || '-'}</Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>Role</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text>{user?.is_org ? 'Shelter' : 'User'}</Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>{t('tag')}</Text>
      </GridItem>
      {/* <GridItem colSpan={3}>
        {user?.tags?.map(tag => (
          <Tag key={tag.id} size={['sm', 'md']} borderRadius="full" variant="outline" colorScheme="green" mr={1} mt={1}>
            <TagLabel>{tag.name}</TagLabel>
            <TagCloseButton />
          </Tag>
        ))}
      </GridItem> */}
    </Grid>
  )
}

export default UserInfo
