import { Box, Center, Flex, Img, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import Logo from 'public/logo/logo_white_bg.png'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { internalPages } from 'config'
import { User } from 'interfaces/User'

interface Props {
  user?: User
}

const Navbar: React.FC<Props> = ({ user }) => (
  <Center shadow="md">
    <Flex alignItems={'center'} w="container.xl">
      <Box w="2xs">
        <NextLink href={internalPages.index}>
          <Link>
            <NextImage src={Logo} />
          </Link>
        </NextLink>
      </Box>
      <Box marginLeft={'auto'}>
        {user && user.id ? (
          <Menu>
            <MenuButton as={Box} cursor="pointer">
              <Img src={user.picture_url || ''} borderRadius={'full'} width="12" />
            </MenuButton>
            <MenuList>
              <NextLink href={internalPages.user.index}>
                <MenuItem textDecoration="none">Profile</MenuItem>
              </NextLink>
              <NextLink href={internalPages.user.logout}>
                <MenuItem textDecoration="none">Logout</MenuItem>
              </NextLink>
            </MenuList>
          </Menu>
        ) : (
          <NextLink href={internalPages.user.login}>
            <Link>Login</Link>
          </NextLink>
        )}
      </Box>
    </Flex>
  </Center>
)

export default Navbar
