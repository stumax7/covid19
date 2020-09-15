import React from 'react';
import { useTable } from 'react-table';

function App() {

  

  const data = [

    {

      id: '0',

      reportDate: '2020-08-22',

      fips: '1',

      county: 'Franklin',

      provinceState: 'Ohio',

      country: 'US',

      lastUpdate: '2020-08-22',

      lat: '2',

      longi: '3',

      confirmed: '4',

      deaths: '5',

      recovered: '6',

      active: '7',

      combinedKey: 'XXXXX',

      incidenceRate: '1.1',

      caseFatalityRatio: '2.2',


    },

    {

      id: '1',

      reportDate: '2020-08-22',

      fips: '2',

      county: 'Morgan',

      provinceState: 'Ohio',

      country: 'US',

      lastUpdate: '2020-08-22',

      lat: '3',

      longi: '4',

      confirmed: '5',

      deaths: '6',

      recovered: '7',

      active: '8',

      combinedKey: 'YYYYY',

      incidenceRate: '3.3',

      caseFatalityRatio: '4.4',

    },

    {

      id: '2',

      reportDate: '2020-08-22',

      fips: '3',

      county: 'Delaware',

      provinceState: 'Ohio',

      country: 'US',

      lastUpdate: '2020-08-22',

      lat: '4',

      longi: '5',

      confirmed: '6',

      deaths: '7',

      recovered: '8',

      active: '9',

      combinedKey: 'ZZZZZ',

      incidenceRate: '5.5',

      caseFatalityRatio: '6.6',

    },

  ]
  
  React.useMemo(() => data, [])



  const columns = [

    {

      Header: 'Id',

      accessor: 'id', 

    },

    {

      Header: 'Report Date',

      accessor: 'reportDate',

    },

    {

      Header: 'FIPS',

      accessor: 'fips',

    },

    {

      Header: 'County',

      accessor: 'county',

    },

    {

      Header: 'State/Province',

      accessor: 'provinceState',

    },

    {

      Header: 'Country',

      accessor: 'country',

    },

    {

      Header: 'Last Update',

      accessor: 'lastUpdate',

    },

    {

      Header: 'Latitude',

      accessor: 'lat',

    },

    {

      Header: 'Longitude',

      accessor: 'longi',

    },

    {

      Header: 'Confirmed',

      accessor: 'confirmed',

    },

    {

      Header: 'Deaths',

      accessor: 'deaths',

    },

    {

      Header: 'Recovered',

      accessor: 'recovered',

    },

    {

      Header: 'Active',

      accessor: 'active',

    },

    {

      Header: 'Combined Key',

      accessor: 'combinedKey',

    },

    {

      Header: 'Incidence Rate',

      accessor: 'incidenceRate',

    },

    {

      Header: 'Case-Fatality Ratio',

      accessor: 'caseFatalityRatio',

    }

  ]
  
  React.useMemo(() => columns, [])



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


export default App;