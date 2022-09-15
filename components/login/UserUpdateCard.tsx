import { Center, FormControl, FormLabel, Input, FormErrorMessage, Button, Stack, Text } from '@chakra-ui/react'
import { User } from 'interfaces/User'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  onSubmitRegister: SubmitHandler<User>
  user: User
}

const UserUpdateCard: React.FC<Props> = ({ onSubmitRegister, user, ...boxProps }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    defaultValues: user,
  })
  return (
    <Stack w="sm" borderRadius="xl" borderColor="black" border="1px" alignItems="center" p={4} {...boxProps}>
      <Text fontWeight="bold">แก้ไขข้อมูล</Text>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <Center gap={4} flexDir="column" p={4}>
          <FormControl isInvalid={Boolean(errors.name)} isRequired>
            <FormLabel htmlFor="name">ชื่อผู้ใช้งาน</FormLabel>
            <Input
              id="name"
              placeholder="ชื่อผู้ใช้งาน"
              {...register('name', {
                required: 'This is required',
                minLength: { value: 1, message: 'Minimum length should be 1' },
              })}
            />
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.description)}>
            <FormLabel htmlFor="description">คำอธิบาย</FormLabel>
            <Input id="description" placeholder="คำอธิบาย" {...register('description')} />
            <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.phone)}>
            <FormLabel htmlFor="phone">เบอร์โทรศัพท์</FormLabel>
            <Input id="phone" placeholder="เบอร์โทรศัพท์" {...register('phone')} />
            <FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
          </FormControl>

          {/* <FormControl isInvalid={Boolean(errors.password)} isRequired>
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
          </FormControl> */}

          {/* <FormControl isInvalid={Boolean(errors.password)} isRequired>
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
          </FormControl> */}

          <Button variant="brandSolid" isLoading={isSubmitting} type="submit">
            แก้ไขข้อมูล
          </Button>
        </Center>
      </form>
    </Stack>
  )
}

export default UserUpdateCard
