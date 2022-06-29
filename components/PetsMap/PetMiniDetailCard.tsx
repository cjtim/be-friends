import { Badge, Box, Flex, Image } from '@chakra-ui/react'

interface Props {
  id: string
  title: string
  image: string
  imageAlt?: string
  onClick: () => void
}

const PetMiniDetailCard: React.FC<Props> = ({ title, image, imageAlt, onClick }) => (
  <Flex maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={onClick}>
    <Image src={image} alt={imageAlt} w="24" h="24" />

    <Box p="6">
      <Box display="flex" alignItems="baseline">
        <Badge borderRadius="full" px="2" colorScheme="teal">
          New
        </Badge>
        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" ml="2">
          2 beds &bull; 3 baths
        </Box>
      </Box>

      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
        {title}
      </Box>
    </Box>
  </Flex>
)

export default PetMiniDetailCard
