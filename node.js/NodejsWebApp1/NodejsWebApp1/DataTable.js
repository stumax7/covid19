import React from 'react';
import { useTable } from 'react-table';

function DataTable() {

    const data = []

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


export default DataTable;