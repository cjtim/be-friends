import {
  Center,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Stack,
  Flex,
  Heading,
  Textarea,
} from '@chakra-ui/react'
import SelectLocationMap from 'components/global/SelectLocationMap'
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
    setValue,
  } = useForm<User>({
    defaultValues: {
      ...user,
      lat: user?.lat || 13.75,
      lng: user?.lng || 100.5,
    },
  })

  const onSelectLocation = (lat: number, lng: number) => {
    setValue('lat', lat)
    setValue('lng', lng)
  }

  return (
    <Stack borderRadius="xl" borderColor="black" border="1px" alignItems="center" p={4} {...boxProps}>
      <Heading fontWeight="bold">Update account</Heading>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <Flex minW="lg">
          <Center gap={4} flexDir="column" p={4} w="2xl">
            <FormControl isInvalid={Boolean(errors.name)} isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                placeholder="Name"
                {...register('name', {
                  required: 'This is required',
                  minLength: { value: 1, message: 'Minimum length should be 1' },
                })}
              />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.description)}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea id="description" placeholder="Description" {...register('description')} />
              <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.phone)}>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <Input
                id="phone"
                placeholder="Phone"
                {...register('phone', {
                  required: 'โปรดระบุเบอร์โทรศัพท์',
                  minLength: { value: 9, message: 'Minimum length should be 9' },
                })}
              />
              <FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
            </FormControl>

            <Button variant="brandSolid" isLoading={isSubmitting} type="submit">
              Update
            </Button>
          </Center>

          {user.is_org && (
            <FormControl isInvalid={Boolean(errors.lng || errors.lat)} isRequired>
              <FormLabel htmlFor="lat">Address</FormLabel>
              <Flex w="100%" h="sm">
                <SelectLocationMap
                  onChange={onSelectLocation}
                  defaultLocation={{ lat: user?.lat || 13.75, lng: user?.lng || 100.5 }}
                />
              </Flex>
              <FormErrorMessage>
                {(errors.lng && errors.lng.message) || (errors.lat && errors.lat.message)}
              </FormErrorMessage>
            </FormControl>
          )}
        </Flex>
      </form>
    </Stack>
  )
}

export default UserUpdateCard
