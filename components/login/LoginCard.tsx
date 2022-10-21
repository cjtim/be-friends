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
  Text,
} from '@chakra-ui/react'
import ButtonLink from 'components/global/ButtonLink'
import { internalPages } from 'config'
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
    <Box w="sm" h="md" borderRadius="xl" borderColor="black" border="1px" {...boxProps}>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <Center gap={4} flexDir="column" p={4}>
          <Text fontWeight="bold">เข้าสู่ระบบผู้ใช้ทั่วไป</Text>
          <LineLoginButton w="2xs" onClick={onClickLineLogin} />
          <Divider />

          <Text fontWeight="bold">เจ้าหน้าที่สถานสงเคราะห์สัตว์</Text>
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
              type="password"
              {...register('password', {
                required: 'This is required',
                minLength: { value: 1, message: 'Minimum length should be 1' },
              })}
            />

            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          <Flex gap={4}>
            <ButtonLink href={internalPages.user.register}>
              <Button variant="brandSolid">ลงทะเบียน</Button>
            </ButtonLink>
            <Button variant="brandOutline" isLoading={isSubmitting} type="submit">
              เข้าสู่ระบบ
            </Button>
          </Flex>
        </Center>
      </form>
    </Box>
  )
}
export default LoginCard
