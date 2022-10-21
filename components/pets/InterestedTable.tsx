import { Text } from '@chakra-ui/react'
import Table from 'components/global/Table'
import TextLink from 'components/global/TextLink'
import { internalPages } from 'config'
import { InterestedPet } from 'interfaces/interested'
import { ParseDateTime } from 'libs/date'
import { CellProps, Column } from 'react-table'
import InterestedStepTag from './InterestedStepTag'

interface Props {
  pets: InterestedPet[]
}

const columns: Column<InterestedPet>[] = [
  {
    accessor: 'name',
    Header: <Text>ชื่อ</Text>,
    Cell: ({ row }: CellProps<InterestedPet>) => (
      <TextLink
        title={row.original.name}
        text={row.original.name}
        to={`${internalPages.pets.index}/${row.original.id}`}
      />
    ),
  },
  {
    accessor: 'step',
    Header: <Text>สถานะ</Text>,
    Cell: ({ row }: CellProps<InterestedPet>) => <InterestedStepTag step={row.original.step} />,
  },
  {
    accessor: 'description',
    Header: <Text>รายละเอียด</Text>,
  },
  {
    accessor: 'created_at',
    Header: <Text>ลงทะเบียนเมื่อ</Text>,
    Cell: ({ row }: CellProps<InterestedPet>) => <>{ParseDateTime(row.original.created_at)}</>,
  },
]

const InterestedTable: React.FC<Props> = ({ pets }) => <Table data={pets} columns={columns} />

export default InterestedTable
