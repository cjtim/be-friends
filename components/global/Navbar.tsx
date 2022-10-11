import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Img,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { internalPages } from 'config'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { UserProps } from 'pages/_app'
import TextLink from './TextLink'
import Logo from './Logo'
import ButtonLink from './ButtonLink'

interface Props extends UserProps {}

// eslint-disable-next-line no-undef
const Navbar: React.FC<Props> = ({ user }) => {
  const { toggleColorMode } = useColorMode()
  const { pathname, asPath, query, locale, push } = useRouter()
  const icon = useColorModeValue(<SunIcon />, <MoonIcon />)
  const lang = { en: '🇺🇸', th: '🇹🇭' }

  const handleLangChange = () => {
    switch (locale) {
      case 'en':
        return push({ pathname, query }, asPath, { locale: 'th' })
      default:
        return push({ pathname, query }, asPath, { locale: 'en' })
    }
  }

  return (
    <Center as="nav" boxShadow="md">
      <Flex alignItems="center" justifyContent="space-between" w={['container.sm', 'container.xl']}>
        <LinkBox w={['30vw', '30vw', '2xs']} cursor="pointer" title="Home page">
          <NextLink href={internalPages.index} passHref>
            <LinkOverlay>
              <Logo key="logo" />
            </LinkOverlay>
          </NextLink>
        </LinkBox>

        <Center w={['30vw', '30vw', '2xs']}>
          <HStack spacing={[0, 0, 4]} shouldWrapChildren flexDir={['column', 'column', 'row']}>
            <TextLink text="หน้าแรก" to={internalPages.index} />
            <TextLink text="ค้นหาเพื่อนคู่ใจ" to={internalPages.findPets} />
            <TextLink text="สถานสงเคราะห์สัตว์" to={internalPages.shelters.index} />
            <TextLink text="เกี่ยวกับเรา" to={internalPages.about} />
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
            <ButtonLink href={internalPages.user.login}>
              <Button variant="brandSolid">เข้าสู่ระบบ</Button>
            </ButtonLink>
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
                <NextLink href={internalPages.user.index} passHref>
                  <MenuItem textDecoration="none">บัญชีของฉัน</MenuItem>
                </NextLink>
                {user.is_org ? (
                  <NextLink href={internalPages.pets.myPet} passHref>
                    <MenuItem textDecoration="none">จัดการสัตว์เลี้ยง</MenuItem>
                  </NextLink>
                ) : (
                  <>
                    <NextLink href={internalPages.user.liked} passHref>
                      <MenuItem textDecoration="none">ถูกใจ</MenuItem>
                    </NextLink>
                    <NextLink href={internalPages.user.interested} passHref>
                      <MenuItem textDecoration="none">สัตว์ที่อุปการะ</MenuItem>
                    </NextLink>
                  </>
                )}
                <NextLink href={internalPages.user.logout} passHref>
                  <MenuItem textDecoration="none">ออกจากระบบ</MenuItem>
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
