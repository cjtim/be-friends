import { PetRegister } from 'interfaces/Pet'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box, FormControl, FormLabel, Input, FormErrorMessage, Button, BoxProps, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import SelectLocationMap from 'components/global/SelectLocationMap'
import { Select } from 'chakra-react-select'
import { Tag } from 'interfaces/Tag'
import { statues, Status } from 'interfaces/status'

interface Props extends BoxProps {
  onSubmitRegister: SubmitHandler<PetRegister>
  tags: Tag[]
}

const PetRegisterCard: React.FC<Props> = ({ onSubmitRegister, tags, ...boxProps }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<PetRegister>({
    defaultValues: {
      lat: 13.75,
      lng: 100.5,
      status: Status.NEW,
    },
  })
  const { t } = useTranslation('pet')

  const onSelectLocation = (lat: number, lng: number) => {
    setValue('lat', lat)
    setValue('lng', lng)
  }

  return (
    <Box w="4xl" borderRadius="xl" borderColor="black" border="1px" {...boxProps}>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <Flex p={4} gap={2}>
          <Box>
            <FormControl isInvalid={Boolean(errors.name)} isRequired>
              <FormLabel htmlFor="name">{t('register.name')}</FormLabel>
              <Input
                id="name"
                placeholder={t('register.name')}
                {...register('name', {
                  required: 'This is required',
                  minLength: { value: 1, message: 'Minimum length should be 1' },
                })}
              />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            {/* Description */}
            <FormControl isInvalid={Boolean(errors.description)}>
              <FormLabel htmlFor="description">{t('register.description')}</FormLabel>
              <Input id="description" placeholder={t('register.description')} {...register('description')} />
              <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
            </FormControl>
            {/* Image */}
            <FormControl isInvalid={Boolean(errors.images)} isRequired>
              <FormLabel htmlFor="images">{t('register.images')}</FormLabel>
              <Input
                id="images"
                type="file"
                multiple
                placeholder={t('register.images')}
                {...register('images', {
                  required: 'This is required',
                  minLength: { value: 1, message: 'Minimum length should be 1' },
                  max: { value: 5, message: 'Maximum files is 5' },
                  maxLength: { value: 5, message: 'Maximum files is 5' },
                })}
              />
              <FormErrorMessage>
                {errors.images && errors.images.length && errors.images.map(e => e.message).join(', ')}
              </FormErrorMessage>
            </FormControl>
            {/* Tags */}
            <FormControl isInvalid={Boolean(errors.tag_ids)} isRequired>
              <FormLabel htmlFor="tag_ids">{t('register.tag_ids')}</FormLabel>
              <Select
                isMulti
                options={tags.map(({ id: value, name: label }) => ({ label, value }))}
                {...register('tag_ids')}
                onChange={values =>
                  setValue(
                    'tag_ids',
                    values.map(v => v.value),
                  )
                }
              />
              <FormErrorMessage>
                {errors.tag_ids && errors.tag_ids.length && errors.tag_ids.map(e => e.message).join(', ')}
              </FormErrorMessage>
            </FormControl>
            {/* Status */}
            <FormControl isInvalid={Boolean(errors.status)} isRequired>
              <FormLabel htmlFor="status">{t('register.status')}</FormLabel>
              <Select
                options={statues.map(s => ({ label: s, value: s }))}
                defaultValue={{ label: Status.NEW, value: Status.NEW }}
                {...register('status', {
                  required: 'Please input status of pet',
                })}
                onChange={val => setValue('status', val?.value || Status.NEW)}
              />
              <FormErrorMessage>{errors.status && errors.status.message}</FormErrorMessage>
            </FormControl>

            <Button colorScheme="brand" isLoading={isSubmitting} type="submit" mt={4}>
              {t('register.register')}
            </Button>
          </Box>

          <FormControl isInvalid={Boolean(errors.lng || errors.lat)} isRequired>
            <FormLabel htmlFor="lat">{t('register.location')}</FormLabel>
            <Flex w="100%" h="sm">
              <SelectLocationMap onChange={onSelectLocation} />
            </Flex>
            <FormErrorMessage>
              {(errors.lng && errors.lng.message) || (errors.lat && errors.lat.message)}
            </FormErrorMessage>
          </FormControl>
        </Flex>
      </form>
    </Box>
  )
}

export default PetRegisterCard
