import { Text } from '@chakra-ui/react'
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
      <TextLink
        title={row.original.name}
        text={row.original.name}
        to={`${internalPages.shelters.index}/${row.original.id}`}
      />
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
]

const ShelterTableList: React.FC<Props> = ({ shelters }) => <Table data={shelters} columns={columns} />

export default ShelterTableList
