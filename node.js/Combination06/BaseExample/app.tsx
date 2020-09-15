declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('react-table');
//import'./app.css'


async function Callgetdata() {
    
    let dbget = {};

    let dbresult = await fetch('/api/getdata', { method: 'GET' });
    if (dbresult.ok) {
        dbget = await dbresult.text();
        console.log('A0: ' + JSON.stringify(dbget));
    } else {
        console.log('A0: ' + dbresult.status);
    }

    console.log('A1: ' + dbget);
    console.log('A2: ' + JSON.stringify(dbget));
    return dbget;
}


function Tabledisplay() {

    let dbdata;
   
    dbdata = Callgetdata()
        .then(function (result) {
            console.log('A3: ' + result);
            return result;
        })

    //let foo = Callgetdata('sql', dbdata);
    //    .then(function (result) { console.log('A3: ' + result); return result; })
    //    .then(function (data) { dbdata = data; return dbdata; });

    console.log('A4: ' + JSON.stringify(dbdata));
    //console.log('A5: ' + JSON.stringify(foo ));

    const data = [dbdata];
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
    } = Table.useTable({ columns, data })
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


class Dbtable extends React.Component {
    render() {
        return (
            <div>
                <h1>What is my data?</h1>
                <Tabledisplay />
            </div>
        );
    }
}

ReactDOM.render(<Dbtable />, document.getElementById('root'));