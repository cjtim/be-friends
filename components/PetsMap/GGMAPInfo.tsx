import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'

interface Props {
  id: string
  title: string
  children: React.ReactNode
}

const GGMAPInfo: React.FC<Props> = ({ id, title, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
      <Button id={id} onClick={onOpen} hidden />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} variant="ghost">
              Close
            </Button>
            <Button variant="link">More info</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default GGMAPInfo
