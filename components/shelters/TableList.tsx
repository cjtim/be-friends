import { Avatar, Flex, Img, Text } from '@chakra-ui/react'
import Table from 'components/global/Table'
import TextLink from 'components/global/TextLink'
import { internalPages } from 'config'
import { User } from 'interfaces/User'
import { CellProps, Column } from 'react-table'

interface Props {
  shelters: User[]
}

const columns: Column<User>[] = [
  {
    accessor: 'name',
    Header: <Text>ชื่อผู้ใช้งาน</Text>,
    Cell: ({ row }: CellProps<User>) => (
      <Flex alignItems="center" gap={2}>
        {row.original &&
          (row.original.picture_url ? (
            <Img src={row.original.picture_url || ''} borderRadius="full" width="10" />
          ) : (
            <Avatar borderRadius="full" width="10" height="10" />
          ))}
        <TextLink
          title={row.original.name}
          text={row.original.name}
          to={`${internalPages.shelters.index}/${row.original.id}`}
        />
      </Flex>
    ),
  },
  {
    accessor: 'description',
    Header: <Text>รายละเอียด</Text>,
  },
  {
    accessor: 'email',
    Header: <Text>อีเมล</Text>,
  },
  {
    accessor: 'phone',
    Header: <Text>เบอร์โทรศัพท์</Text>,
  },
]

const ShelterTableList: React.FC<Props> = ({ shelters }) => <Table data={shelters} columns={columns} />

export default ShelterTableList
