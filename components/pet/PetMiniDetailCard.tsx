import { Badge, Box, Image } from '@chakra-ui/react'

interface Props {
  id: string
  title: string
  image: string
  imageAlt?: string
}

const PetMiniDetailCard: React.FC<Props> = ({ id, title, image, imageAlt }) => (
  <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Image src={image} alt={imageAlt} w="2xs" onClick={() => document?.getElementById(id)?.click()} />

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
  </Box>
)

export default PetMiniDetailCard
