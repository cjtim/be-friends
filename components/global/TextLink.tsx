import { Text, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  text: string
  to: string
  title?: string
}

// eslint-disable-next-line no-undef
const TextLink: React.FC<Props> = ({ text, to, title }) => {
  const { pathname } = useRouter()
  const color = useColorModeValue('black', 'white')
  return (
    <Text
      fontWeight="semibold"
      cursor="pointer"
      color={pathname === to ? color : 'gray'}
      _hover={{
        color,
      }}
    >
      <NextLink href={to} title={title}>
        {text}
      </NextLink>
    </Text>
  )
}

export default TextLink
