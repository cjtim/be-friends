import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Img,
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
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { UserProps } from 'pages/_app'
import TextLink from './TextLink'
import Logo from './Logo'

interface Props extends UserProps {}

// eslint-disable-next-line no-undef
const Navbar: React.FC<Props> = ({ user }) => {
  const { toggleColorMode } = useColorMode()
  const { pathname, asPath, query, locale, push } = useRouter()
  const icon = useColorModeValue(<SunIcon />, <MoonIcon />)
  const lang = { en: '🇺🇸', th: '🇹🇭' }
  const { t } = useTranslation('common')

  const handleLangChange = () => {
    switch (locale) {
      case 'en':
        return push({ pathname, query }, asPath, { locale: 'th' })
      default:
        return push({ pathname, query }, asPath, { locale: 'en' })
    }
  }

  return (
    <Center boxShadow="md">
      <Flex alignItems="center" justifyContent="space-between" w={['container.sm', 'container.xl']}>
        <NextLink href={internalPages.index}>
          <Box w={['30vw', '30vw', '2xs']} cursor="pointer" title="Home page">
            <Logo />
          </Box>
        </NextLink>

        <Center w={['30vw', '30vw', '2xs']}>
          <HStack spacing={[0, 0, 4]} shouldWrapChildren flexDir={['column', 'column', 'row']}>
            <TextLink text={t('navbar.home')} to={internalPages.index} />
            <TextLink text={t('navbar.findPets')} to={internalPages.findPets} />
            <TextLink text={t('navbar.about')} to={internalPages.about} />
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
          {user === undefined ? (
            <NextLink href={internalPages.user.login}>
              <Button colorScheme="brand">
                <Text color="white">{t('navbar.login')}</Text>
              </Button>
            </NextLink>
          ) : (
            <Menu>
              <MenuButton as={Box} cursor="pointer">
                {user && user.picture_url && <Img src={user.picture_url || ''} borderRadius="full" width="12" />}
                {user && !user.picture_url && (
                  <Avatar borderRadius="full" width="12">
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Avatar>
                )}
              </MenuButton>
              <MenuList>
                <NextLink href={internalPages.user.index}>
                  <MenuItem textDecoration="none">{t('navbar.profile')}</MenuItem>
                </NextLink>
                <NextLink href={internalPages.user.logout}>
                  <MenuItem textDecoration="none">{t('navbar.logout')}</MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          )}

          <Button onClick={toggleColorMode}>{icon}</Button>
          <Button onClick={handleLangChange}>{locale === 'en' ? lang.th : lang.en}</Button>
        </HStack>
      </Flex>
    </Center>
  )
}

export default Navbar
