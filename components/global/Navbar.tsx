import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Img,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
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
  // const color = useColorModeValue('black', 'white')

  return (
    <Center boxShadow="md">
      <Flex alignItems={'center'} justifyContent="space-between" w={['container.sm', 'container.xl']}>
        <Box w={['30vw', '30vw', '2xs']} cursor="pointer" title="Home page">
          <Link as={NextLink} href={internalPages.index}>
            <Logo />
          </Link>
        </Box>

        <Center w={['30vw', '30vw', '2xs']}>
          <HStack spacing={[0, 0, 4]} shouldWrapChildren flexDir={['column', 'column', 'row']}>
            <TextLink text="Home" to={internalPages.index} />
            <TextLink text="Find Pets" to={internalPages.findPets} />
            <TextLink text="About" to={internalPages.about} />
          </HStack>
        </Center>
        {/* <Divider orientation="vertical" h="4vh" borderColor={color} /> */}

        <HStack
          w={['30vw', '30vw', '2xs']}
          spacing={[0, 0, 4]}
          shouldWrapChildren
          flexDir={['column', 'column', 'row']}
          justifyContent="flex-end"
        >
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
              <Button>
                <Text>Login</Text>
              </Button>
            </NextLink>
          )}
          <Button onClick={toggleColorMode}>{icon}</Button>
        </HStack>
      </Flex>
    </Center>
  )
}

export default Navbar
