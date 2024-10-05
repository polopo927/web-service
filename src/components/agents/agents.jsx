import React, { useCallback, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './agents.css'
import { AgentsPopup } from './agentsPopup'

export const AgentsTable = () => {
  const [data, setData] = useState(useMemo(() => [
    { faceid: 1, ikpid: 'Product 1', status: 'LOB1', datecreate: 101 },
  ], []))
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const openPopup = () => {
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  const addRow = useCallback((newRowData) => {
    setData(prevData => [...prevData, newRowData])
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Статус',
        accessor: 'status',
      },
      {
        Header: 'Дата создания',
        accessor: 'datecreate',
      },
      {
        Header: 'Дата начала',
        accessor: 'datestart',
      },
      {
        Header: 'Дата окончания',
        accessor: 'dateend',
      },
      {
        Header: 'Менеджер',
        accessor: 'manager',
      },
      {
        Header: 'ФИО Агента',
        accessor: 'fullnameagent',
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
    <section className="agents">
      <div className="container__agents">
        <div className="agents__header">
          <span className="agents__header-info">Информация об агентах</span>
        </div>
        <table className="agents__table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className="agents__table-header-row" key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="agents__table-header-cell" key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
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
            <tr>
              <td colSpan={columns.length} className='agents__add-cell'>
                <button className="agents__add-button" onClick={openPopup}>
                  Добавить агента
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isPopupOpen && <AgentsPopup addRow={addRow} closePopup={closePopup} />}
    </section>
  );
};
