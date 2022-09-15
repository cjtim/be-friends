import { Center, FormControl, FormLabel, Input, FormErrorMessage, Button, Stack, Text } from '@chakra-ui/react'
import { UserChangePassword } from 'interfaces/User'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  onSubmitRegister: SubmitHandler<UserChangePassword>
}

const UserPassword: React.FC<Props> = ({ onSubmitRegister, ...boxProps }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserChangePassword>()
  return (
    <Stack w="sm" borderRadius="xl" borderColor="black" border="1px" alignItems="center" p={4} {...boxProps}>
      <Text fontWeight="bold">เปลี่ยนรหัสผ่าน</Text>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <Center gap={4} flexDir="column" p={4}>
          <FormControl isInvalid={Boolean(errors.currentPassword)} isRequired>
            <FormLabel htmlFor="currentPassword">รหัสผ่านปัจจุบัน</FormLabel>
            <Input
              id="currentPassword"
              placeholder="รหัสผ่านปัจจุบัน"
              type="currentPassword"
              {...register('currentPassword', {
                required: 'This is required',
                minLength: { value: 1, message: 'Minimum length should be 1' },
              })}
            />

            <FormErrorMessage>{errors.currentPassword && errors.currentPassword.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.newPassword)} isRequired>
            <FormLabel htmlFor="newPassword">รหัสผ่านใหม่</FormLabel>
            <Input
              id="newPassword"
              placeholder="รหัสผ่านใหม่"
              type="password"
              {...register('newPassword', {
                required: 'This is required',
                minLength: { value: 1, message: 'Minimum length should be 1' },
              })}
            />

            <FormErrorMessage>{errors.newPassword && errors.newPassword.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.confirmPassword)} isRequired>
            <FormLabel htmlFor="confirmPassword">ยืนยันรหัสผ่านใหม่</FormLabel>
            <Input
              id="confirmPassword"
              placeholder="ยืนยันรหัสผ่านใหม่"
              type="password"
              {...register('confirmPassword', {
                required: 'This is required',
                minLength: { value: 1, message: 'Minimum length should be 1' },
              })}
            />

            <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
          </FormControl>

          <Button variant="brandSolid" isLoading={isSubmitting} type="submit">
            เปลี่ยนรหัสผ่าน
          </Button>
        </Center>
      </form>
    </Stack>
  )
}

export default UserPassword
