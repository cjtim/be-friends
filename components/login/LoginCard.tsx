import {
  Box,
  BoxProps,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { UserLogin } from 'interfaces/User'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import LineLoginButton from './LineLoginButton'

interface Props extends BoxProps {
  onClickLineLogin: () => void
  onSubmitLogin: SubmitHandler<UserLogin>
}

// eslint-disable-next-line no-undef
const LoginCard: React.FC<Props> = ({ onClickLineLogin, onSubmitLogin, ...boxProps }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLogin>()
  const { t } = useTranslation('user')

  return (
    <Box w="sm" h="sm" borderRadius="xl" borderColor="black" border="1px" {...boxProps}>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <Center gap={4} flexDir="column" p={4}>
          <FormControl isInvalid={Boolean(errors.email)} isRequired>
            <FormLabel htmlFor="Email">{t('email')}</FormLabel>
            <Input
              id="email"
              placeholder={t('email')}
              {...register('email', {
                required: 'This is required',
                minLength: { value: 2, message: 'Minimum length should be 2' },
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.password)} isRequired>
            <FormLabel htmlFor="password">{t('password')}</FormLabel>
            <Input
              id="password"
              placeholder={t('password')}
              {...register('password', {
                required: 'This is required',
                minLength: { value: 1, message: 'Minimum length should be 1' },
              })}
            />

            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          <Flex gap={4}>
            <Button colorScheme="brand">{t('register')}</Button>
            <Button colorScheme="brand" variant="outline" isLoading={isSubmitting} type="submit">
              {t('login')}
            </Button>
          </Flex>
          <Divider />

          <LineLoginButton w="2xs" onClick={onClickLineLogin} />
        </Center>
      </form>
    </Box>
  )
}
export default LoginCard
