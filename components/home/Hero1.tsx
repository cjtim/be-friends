import { Button, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

// eslint-disable-next-line no-undef
const Hero1: React.FC = () => {
  const { t } = useTranslation('index')
  return (
    <Flex justifyContent="center" alignItems="center" flexDir="column" p={24}>
      <Heading py={4}>{t('hero1.title')}</Heading>

      <Text py={4} w="xs">
        {t('hero1.subtitle')}
      </Text>

      <HStack py={4} spacing={4}>
        <Button colorScheme="brand">
          <Text color="white">{t('hero1.mainButton')}</Text>
        </Button>
        <Button>{t('hero1.secondaryButton')}</Button>
      </HStack>
    </Flex>
  )
}

export default Hero1
