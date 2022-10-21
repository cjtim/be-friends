import { Text, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ExternalLinkIcon } from '@chakra-ui/icons'

interface Props {
  text: string
  to: string
  title?: string
  showIcon?: boolean
}

// eslint-disable-next-line no-undef
const TextLink: React.FC<Props> = ({ text, to, title, showIcon }) => {
  const { pathname } = useRouter()
  const color = useColorModeValue('black', 'white')
  return (
    <NextLink href={to} title={title}>
      <Text
        fontWeight="semibold"
        cursor="pointer"
        color={pathname === to ? color : 'gray'}
        _hover={{
          color,
        }}
      >
        <>
          {text} {showIcon && <ExternalLinkIcon />}
        </>
      </Text>
    </NextLink>
  )
}

export default TextLink
