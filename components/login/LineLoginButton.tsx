import { Divider, HStack, Text, StackProps } from '@chakra-ui/react'
import NextImage from 'next/image'

const LineLoginButton: React.FC<StackProps> = props => {
  return (
    <HStack
      bgColor={'#06C755'}
      borderRadius="xl"
      _hover={{
        opacity: '90%',
        cursor: 'pointer',
      }}
      {...props}
    >
      <NextImage src={'/logo/line_btn_base.png'} alt="line logo" width="44" height="44" />
      <Divider orientation="vertical" />
      <Text color="white" pl="22px" pr="44px" fontWeight={'semibold'}>
        Log in with LINE
      </Text>
    </HStack>
  )
}

export default LineLoginButton
