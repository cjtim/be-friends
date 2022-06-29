import { Center, Heading } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const About: React.FC = () => {
  const { t } = useTranslation('common')
  return (
    <Center p={4}>
      <Heading>{t('navbar.about')}</Heading>
    </Center>
  )
}
export default About
