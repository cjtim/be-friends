/* eslint-disable camelcase */
import { Box, Flex, Image, Stack, Tag } from '@chakra-ui/react'
import TextLink from 'components/global/TextLink'
import { internalPages } from 'config'
import { Pet } from 'interfaces/Pet'

interface Props extends Pet {
  onClick: () => void
}

const PetMiniDetailCard: React.FC<Props> = ({ id, name, description, picture_urls, tags, onClick }) => (
  <Flex maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Image
      src={
        (picture_urls && picture_urls[0] && picture_urls[0].picture_url) ||
        'https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png'
      }
      alt={name}
      w="24"
      h="24"
      onClick={onClick}
    />

    <Stack p="6">
      <Flex gap={2} alignItems="baseline">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          <TextLink text={name || 'no name'} to={`${internalPages.pets.index}/${id}`} key={id + name} title={name} />
        </Box>
        {/* <PetStatusTag status={status} /> */}
      </Flex>
      <Flex gap={1}>
        {tags?.map(tag => (
          <Tag key={tag.id}>{tag.name}</Tag>
        ))}
      </Flex>
      <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" ml="2">
        {description}
      </Box>
    </Stack>
  </Flex>
)

export default PetMiniDetailCard
