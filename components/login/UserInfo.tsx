import { Avatar, AvatarBadge, Button, Center, Flex, Grid, GridItem, Img, Text } from '@chakra-ui/react'
import ButtonLink from 'components/global/ButtonLink'
import StaticMap from 'components/global/StaticMap'
import { User } from 'interfaces/User'

interface Props {
  user: User
}

const UserInfo: React.FC<Props> = ({ user }) => (
  <Flex maxW="5xl" borderRadius="lg" border="1px" borderColor="gray">
    <Grid templateColumns="repeat(4, 1fr)" gap={2} p={4}>
      <GridItem colSpan={4}>
        <Center flexDir="column" gap={2}>
          {user && user.picture_url && <Img src={user.picture_url || ''} borderRadius="full" w="24" />}
          {user && !user.picture_url && (
            <Avatar borderRadius="full" size="lg">
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          )}
          <Text fontSize="2xl">{user?.name}</Text>
          <Flex gap={4}>
            <ButtonLink href="/user/update">
              <Button colorScheme="green" variant="outline">
                เเก้ไขข้อมูล
              </Button>
            </ButtonLink>
            {user.is_org && (
              <ButtonLink href="/user/password">
                <Button colorScheme="red" variant="outline">
                  เปลี่ยนรหัสผ่าน
                </Button>
              </ButtonLink>
            )}
          </Flex>
        </Center>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>ไอดี</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text>{user?.id}</Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>อีเมล</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text>{user?.email || '-'}</Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>รายละเอียด</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text>{user?.description || '-'}</Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>โทรศัพท์</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text>{user?.phone || '-'}</Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Text>ประเภทผู้ใช้</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text>{user?.is_org ? 'สถานสงเคราะห์สัตว์' : 'ผู้ใช้งานทั่วไป'}</Text>
      </GridItem>
    </Grid>
    {user.lat && user.lng && (
      <Flex w="xl" h="xl">
        <StaticMap lat={user.lat} lng={user.lng} />
      </Flex>
    )}
  </Flex>
)

export default UserInfo
