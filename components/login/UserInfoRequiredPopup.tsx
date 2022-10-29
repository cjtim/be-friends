import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { config } from 'config'
import { User } from 'interfaces/User'
import axios from 'libs/axios'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'
import UserUpdateCard from './UserUpdateCard'

interface Props {
  user: User
}

const UserInfoRequiredPopup: React.FC<Props> = ({ user }) => {
  const router = useRouter()
  const onClose = () => {}
  const handleSave: SubmitHandler<User> = async (values: User) => {
    console.log(values.phone)
    await axios.post<string>(config.auth.POST_update, values)

    router.reload()
  }

  return user.phone ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  ) : (
    <Modal isOpen onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>แก้ไขบัญชี</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UserUpdateCard user={user} onSubmitRegister={handleSave} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UserInfoRequiredPopup
