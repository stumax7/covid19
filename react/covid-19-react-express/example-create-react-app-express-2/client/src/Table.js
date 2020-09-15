import React from 'react';
import { useTable } from 'react-table';

function Table({dbget}) {
  
  console.log('3 dbget From APP' + JSON.stringify(dbget))
  const data = [dbget]
  console.log('4 data : ' + JSON.stringify(data))
    
  React.useMemo(() => data, [data])
  const columns = [
    {
      Header: 'Id',
      accessor: 'Id', 
    },
    {
      Header: 'Report Date',
      accessor: 'ReportDate',
    },
    {
      Header: 'FIPS',
      accessor: 'FIPS',
    },
    {
      Header: 'County',
      accessor: 'County',
    },
    {
      Header: 'State/Province',
      accessor: 'ProvinceState',
    },
    {
      Header: 'Country',
      accessor: 'CountryRegion',
    },
    {
      Header: 'Last Update',
      accessor: 'LastUpdate',
    },
    {
      Header: 'Latitude',
      accessor: 'Lat',
    },
    {
      Header: 'Longitude',
      accessor: 'Longi',
    },
    {
      Header: 'Confirmed',
      accessor: 'Confirmed',
    },
    {
      Header: 'Deaths',
      accessor: 'Deaths',
    },
    {
      Header: 'Recovered',
      accessor: 'Recovered',
    },
    {
      Header: 'Active',
      accessor: 'Active',
    },
    {
      Header: 'Combined Key',
      accessor: 'CombinedKey',
    },
    {
      Header: 'Incidence Rate',
      accessor: 'IncidenceRate',
    },
    {
      Header: 'Case-Fatality Ratio',
      accessor: 'CaseFatalityRatio',
    }
  ]
  React.useMemo(() => columns, [columns])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })
  return (
    <table {...getTableProps()} >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px black',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px black',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default Table;