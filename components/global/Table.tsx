/* eslint-disable react/jsx-key */
import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { Column, useTable } from 'react-table'

interface Props<T extends object> {
  data: T[]
  columns: Column<T>[]
}
const Table = <T extends object>({ data, columns }: Props<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <TableContainer borderRadius="lg" border="1px" borderColor="gray.200">
      <ChakraTable {...getTableProps()} variant="simple">
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            )
          })}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  )
}

export default Table
