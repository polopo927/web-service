import React, { useMemo } from 'react';
import { useTable } from 'react-table'
import './insurance.css'


export const InsuranceTable = () => {
  const data = [
    { id: 1, contractid: 'Product 1', riskid: 'LOB1', premium: 'Risk A', insuransesum: 101 },
  ]

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'ContractID',
        accessor: 'contractid',
      },
      {
        Header: 'RiskId',
        accessor: 'riskid',
      },
      {
        Header: 'Premium',
        accessor: 'premium',
      },
      {
        Header: 'InsuranseSum',
        accessor: 'insuransesum',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <section className="insurance">
      <div className="container__insurance">
        <div className="insurance__header">
          <span className="insurance__header-info">Страховые премии</span>
        </div>
        <table className="insurance__table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className="insurance__table-header-row" key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="insurance__table-header-cell" key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td key={cell.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};