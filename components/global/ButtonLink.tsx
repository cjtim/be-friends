import { LinkBox, LinkOverlay } from '@chakra-ui/react'
import NextLink from 'next/link'

interface Props {
  href: string
  children: React.ReactNode
}

const ButtonLink: React.FC<Props> = ({ href, children }) => (
  <LinkBox>
    <NextLink href={href} passHref>
      <LinkOverlay>{children}</LinkOverlay>
    </NextLink>
  </LinkBox>
)
export default ButtonLink
