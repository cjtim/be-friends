import { Text } from '@chakra-ui/react'
import Table from 'components/global/Table'
import TextLink from 'components/global/TextLink'
import { internalPages } from 'config'
import { Pet } from 'interfaces/Pet'
import { CellProps, Column } from 'react-table'

interface Props {
  pets: Pet[]
}

const PetsTable: React.FC<Props> = ({ pets }) => {
  const columns: Column<Pet>[] = [
    {
      accessor: 'name',
      Header: <Text>Name</Text>,
      Cell: ({ row }: CellProps<Pet>) => (
        <TextLink
          title={row.original.name}
          text={row.original.name}
          to={`${internalPages.pets.index}/${row.original.id}`}
        />
      ),
    },
    {
      accessor: 'description',
      Header: <Text>Description</Text>,
    },
  ]

  return <Table data={pets} columns={columns} />
}

export default PetsTable
