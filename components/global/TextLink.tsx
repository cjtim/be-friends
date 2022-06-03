import { Text, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  text: string
  to: string
  title?: string
}

const TextLink: React.FC<Props> = ({ text, to, title }) => {
  const { pathname } = useRouter()
  const color = useColorModeValue('black', 'white')
  return (
    <NextLink href={to} title={title}>
      <Text
        fontWeight={'semibold'}
        cursor="pointer"
        color={pathname === to ? color : 'gray'}
        _hover={{
          color,
        }}
      >
        {text}
      </Text>
    </NextLink>
  )
}

export default TextLink
