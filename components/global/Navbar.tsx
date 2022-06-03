import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Img,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { internalPages } from 'config'
import { User } from 'interfaces/User'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Logo from './Logo'
import TextLink from './TextLink'

interface Props {
  user?: User
}

const Navbar: React.FC<Props> = ({ user }) => {
  const { toggleColorMode } = useColorMode()
  const icon = useColorModeValue(<SunIcon />, <MoonIcon />)
  const color = useColorModeValue('black', 'white')

  return (
    <Center boxShadow="md">
      <Flex alignItems={'center'} w="container.xl">
        <Box w="2xs" cursor="pointer" title="Home page">
          <Link as={NextLink} href={internalPages.index}>
            <Logo />
          </Link>
        </Box>

        <HStack marginLeft={'auto'} spacing={4}>
          <TextLink text="Home" to={internalPages.index} />
          <TextLink text="Find Pets" to={internalPages.findPets} />
          <TextLink text="About" to={internalPages.about} />
          <Divider orientation="vertical" h="4vh" borderColor={color} />
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
            <TextLink text="Login" to={internalPages.user.login} />
          )}
          <Button onClick={toggleColorMode}>{icon}</Button>
        </HStack>
      </Flex>
    </Center>
  )
}

export default Navbar
