import { LinkBox, LinkBoxProps, LinkOverlay } from '@chakra-ui/react'
import NextLink from 'next/link'

interface Props extends LinkBoxProps {
  href: string
  children: React.ReactNode
  isExternal?: boolean
}

const ButtonLink: React.FC<Props> = ({ href, isExternal, children, ...boxProps }) => (
  <LinkBox {...boxProps}>
    <NextLink href={href} passHref>
      <LinkOverlay isExternal={isExternal}>{children}</LinkOverlay>
    </NextLink>
  </LinkBox>
)
export default ButtonLink
