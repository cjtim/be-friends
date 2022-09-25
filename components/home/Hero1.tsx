import { Button, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import ButtonLink from 'components/global/ButtonLink'
import { internalPages } from 'config'

// eslint-disable-next-line no-undef
const Hero1: React.FC = () => (
  <Flex justifyContent="center" alignItems="center" flexDir="column" p={24}>
    <Heading py={4}>น้องๆ กำลังรอการช่วยเหลือจากคุณ</Heading>

    <Text py={4} w="xs">
      Be Friends คือ Platfrom ที่ช่วยให้คุณจับคู่กับสัตว์เลี้ยงที่ต้องการความช่วยเหลือได้ง่ายขึ้น!
    </Text>

    <HStack py={4} spacing={4}>
      <ButtonLink href={internalPages.findPets}>
        <Button colorScheme="brand">
          <Text color="white">ค้นหาเพื่อนคู่ใจ</Text>
        </Button>
      </ButtonLink>

      <ButtonLink href={internalPages.shelters.index}>
        <Button>ค้นหาสถานสงเคราะห์สัตว์ใกล้บ้าน</Button>
      </ButtonLink>
    </HStack>
  </Flex>
)

export default Hero1
