import { Badge, Box, Flex, Image, Stack } from '@chakra-ui/react'

interface Props {
  id: string
  title: string
  description?: string
  image: string
  imageAlt?: string
  onClick: () => void
}

const PetMiniDetailCard: React.FC<Props> = ({ title, description, image, imageAlt, onClick }) => (
  <Flex maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={onClick}>
    <Image src={image} alt={imageAlt} w="24" h="24" />

    <Stack p="6">
      <Flex gap={2} alignItems="baseline">
        <Badge borderRadius="full" px="2" colorScheme="teal">
          New
        </Badge>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          {title}
        </Box>
      </Flex>
      <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" ml="2">
        {description}
      </Box>
    </Stack>
  </Flex>
)

export default PetMiniDetailCard
