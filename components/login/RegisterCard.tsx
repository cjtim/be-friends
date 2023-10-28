import {
  Center,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  BoxProps,
  Stack,
  Text,
} from '@chakra-ui/react'
import { UserRegister } from 'interfaces/User'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props extends BoxProps {
  onSubmitRegister: SubmitHandler<UserRegister>
}

const RegisterCard: React.FC<Props> = ({ onSubmitRegister, ...boxProps }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegister>()
  const { t } = useTranslation('user')

  return (
    <Stack w="sm" borderRadius="xl" borderColor="black" border="1px" alignItems="center" p={4} {...boxProps}>
      <Text fontWeight="bold">{t('register')}</Text>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <Center gap={4} flexDir="column" p={4}>
          <FormControl isInvalid={Boolean(errors.name)} isRequired>
            <FormLabel htmlFor="name">{t('name')}</FormLabel>
            <Input
              id="name"
              placeholder={t('name')}
              {...register('name', {
                required: 'This is required',
                minLength: { value: 1, message: 'Minimum length should be 1' },
              })}
            />
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.email)} isRequired>
            <FormLabel htmlFor="email">{t('email')}</FormLabel>
            <Input
              id="email"
              placeholder={t('email')}
              {...register('email', {
                required: 'This is required',
                minLength: { value: 3, message: 'Minimum length should be 3' },
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Email should be valid pattern',
                },
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.password)} isRequired>
            <FormLabel htmlFor="password">{t('password')}</FormLabel>
            <Input
              id="password"
              placeholder={t('password')}
              type="password"
              {...register('password', {
                required: 'This is required',
                minLength: { value: 1, message: 'Minimum length should be 1' },
              })}
            />

            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.password)} isRequired>
            <FormLabel htmlFor="confirm_password">{t('confirm_password')}</FormLabel>
            <Input
              id="confirm_password"
              placeholder={t('confirm_password')}
              type="password"
              {...register('confirm_password', {
                required: 'This is required',
                minLength: { value: 1, message: 'Minimum length should be 1' },
              })}
            />

            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          <Button variant="brandSolid" isLoading={isSubmitting} type="submit">
            {t('register')}
          </Button>
        </Center>
      </form>
    </Stack>
  )
}

export default RegisterCard
