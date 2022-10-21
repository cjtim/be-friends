import { Text } from '@chakra-ui/react'
import Table from 'components/global/Table'
import TextLink from 'components/global/TextLink'
import { internalPages } from 'config'
import { Pet } from 'interfaces/Pet'
import { ParseDateTime } from 'libs/date'
import { CellProps, Column } from 'react-table'
import PetStatusTag from './PetStatusTag'

interface Props {
  pets: Pet[]
}

const columns: Column<Pet>[] = [
  {
    accessor: 'name',
    Header: <Text>ชื่อ</Text>,
    Cell: ({ row }: CellProps<Pet>) => (
      <TextLink
        title={row.original.name}
        text={row.original.name}
        to={`${internalPages.pets.index}/${row.original.id}`}
      />
    ),
  },
  {
    accessor: 'status',
    Header: <Text>สถานะ</Text>,
    Cell: ({ row }: CellProps<Pet>) => <PetStatusTag status={row.original.status} />,
  },
  {
    accessor: 'description',
    Header: <Text>รายละเอียด</Text>,
  },
  {
    accessor: 'created_at',
    Header: <Text>ลงทะเบียนเมื่อ</Text>,
    Cell: ({ row }: CellProps<Pet>) => <>{ParseDateTime(row.original.created_at)}</>,
  },
  {
    accessor: 'interested',
    Header: <Text>สนใจอุปถัมภ์</Text>,
    Cell: ({ row }: CellProps<Pet>) => <>{row.original.interested.length || 0} คน</>,
  },
  {
    accessor: 'liked',
    Header: <Text>ถูกใจ</Text>,
    Cell: ({ row }: CellProps<Pet>) => <>{row.original.liked.length || 0} คน</>,
  },
]

const PetsTable: React.FC<Props> = ({ pets }) => <Table data={pets} columns={columns} />

export default PetsTable