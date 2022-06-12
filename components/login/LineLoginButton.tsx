import { Divider, HStack, Text, StackProps } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import NextImage from 'next/image'

// eslint-disable-next-line no-undef
const LineLoginButton: React.FC<StackProps> = props => {
  const { t } = useTranslation('user')

  return (
    <HStack
      bgColor="#06C755"
      borderRadius="xl"
      _hover={{
        opacity: '90%',
        cursor: 'pointer',
      }}
      {...props}
    >
      <NextImage src="/logo/line_btn_base.png" alt="line logo" width="44" height="44" />
      <Divider orientation="vertical" />
      <Text color="white" pl="22px" pr="44px" fontWeight="semibold">
        {t('login2')}
      </Text>
    </HStack>
  )
}

export default LineLoginButton
