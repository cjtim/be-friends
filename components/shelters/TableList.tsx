import { Text } from '@chakra-ui/react'
import Table from 'components/global/Table'
import { Shelter } from 'interfaces/Shelter'
import { CellProps, Column } from 'react-table'

interface Props {
  shelters: Shelter[]
}

const columns: Column<Shelter>[] = [
  {
    accessor: 'name',
    Header: <Text>Name</Text>,
  },
  {
    accessor: 'address',
    Header: <Text>Address</Text>,
  },
  {
    Cell: ({ row }: CellProps<Shelter>) => <Text>{row.original.contacts.line || ''}</Text>,
    accessor: 'contacts.line' as any,
    Header: <Text>Line</Text>,
  },
  {
    Cell: ({ row }: CellProps<Shelter>) => <Text>{row.original.contacts.messenger || ''}</Text>,
    accessor: 'contacts.messenger' as any,
    Header: <Text>Messenger</Text>,
  },
]

const ShelterTableList: React.FC<Props> = ({ shelters }) => <Table data={shelters} columns={columns} />

export default ShelterTableList
