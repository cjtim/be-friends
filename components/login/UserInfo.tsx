import { Avatar, AvatarBadge, Center, Grid, GridItem, Img, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/react'
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
        <Text>{user?.email}</Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>{t('tag')}</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Tag size={['sm', 'md']} borderRadius="full" variant="solid" colorScheme="green">
          <TagLabel>Green</TagLabel>
          <TagCloseButton />
        </Tag>
      </GridItem>
    </Grid>
  )
}

export default UserInfo
