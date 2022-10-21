import { InterestedSteps, InterestedUser } from 'interfaces/interested'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  UseDisclosureProps,
} from '@chakra-ui/react'
import Table from 'components/global/Table'
import { CellProps, Column } from 'react-table'
import { Select } from 'chakra-react-select'
import { useState } from 'react'
import axios from 'libs/axios'
import { config } from 'config'

interface Props extends UseDisclosureProps {
  interestedUsers: InterestedUser[]
}

const InterestedModal: React.FC<Props> = ({ interestedUsers: originalInterestedUser, isOpen, onClose }) => {
  const [interestedUsers, setInterestedUsers] = useState<InterestedUser[]>(originalInterestedUser)
  return (
    <Modal isOpen={isOpen || false} onClose={onClose as () => void} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ผู้ที่สนใจสัตว์</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table
            columns={
              [
                { accessor: 'name', Header: 'ชื่อ' },
                { accessor: 'phone', Header: 'โทรศัพท์' },
                {
                  accessor: 'step',
                  Header: 'สถานะ',
                  Cell: ({ row }: CellProps<InterestedUser>) => (
                    <Select
                      focusBorderColor="green.500"
                      defaultValue={{ label: row.original.step, value: row.original.step }}
                      options={InterestedSteps.map(step => ({ label: step, value: step }))}
                      onChange={newVal => {
                        const find = interestedUsers.find(
                          u => u.user_id === row.original.user_id && u.pet_id === row.original.pet_id,
                        )
                        const newArr: InterestedUser[] = [
                          ...interestedUsers.filter(
                            u => !(u.user_id === row.original.user_id && u.pet_id === row.original.pet_id),
                          ),
                          { ...find, step: newVal?.value } as InterestedUser,
                        ]
                        // Update API
                        axios.put(
                          config.interest.PUT_update.replace(':pet_id', String(row.original.pet_id)),
                          {},
                          {
                            params: {
                              step: newVal?.value,
                              user_id: row.original.user_id,
                            },
                          },
                        )

                        setInterestedUsers(newArr)
                      }}
                      menuPosition="fixed"
                    />
                  ),
                },
              ] as Column<InterestedUser>[]
            }
            data={interestedUsers}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InterestedModal
