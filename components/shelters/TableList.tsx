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
    Header: <Text>Name</Text>,
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
          showIcon
        />
      </Flex>
    ),
  },
  {
    accessor: 'description',
    Header: <Text>Description</Text>,
  },
  {
    accessor: 'email',
    Header: <Text>Email</Text>,
  },
  {
    accessor: 'phone',
    Header: <Text>Phone</Text>,
  },
]

const ShelterTableList: React.FC<Props> = ({ shelters }) => <Table data={shelters} columns={columns} />

export default ShelterTableList
