import { Button, Flex, Heading, HStack, Text } from '@chakra-ui/react'

const Hero1: React.FC = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} flexDir="column" p={24}>
      <Heading py={4}>น้องๆ กำลังรอการช่วยเหลือจากคุณ</Heading>

      <Text py={4} w="xs">
        Be Friends คือ Platfrom ที่ช่วยให้คุณจับคู่กับสัตว์เลี้ยงที่ต้องการความช่วยเหลือได้ง่ายขึ้น!
      </Text>

      <HStack py={4} spacing={4}>
        <Button colorScheme={'brand'}>
          <Text color="white">หาเพื่อนคู่ใจ</Text>
        </Button>
        <Button>เป็นผู้สนับสนุนเรา</Button>
      </HStack>
    </Flex>
  )
}

export default Hero1
