import React, { useCallback, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './counterparties.css'
import { CounterpartiesPopup } from './counterpartiesPopup';

export const CounterpartiestTable = () => {
  const [data, setData] = useState(useMemo(() => [
    { id: 1, type: 'Product 1', firstname: 'LOB1', lastname: ['Risk A', 'Risk B'], datebirth: 101, namecompany: 'sdfgdsg', inn: '125423' },
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
        Header: '№',
        accessor: 'id',
      },
      {
        Header: 'Имя',
        accessor: 'firstname',
      },
      {
        Header: 'Фамилия',
        accessor: 'lastname',
      },
      {
        Header: 'Дата рождения',
        accessor: 'dateofbirth',
      },
      {
        Header: 'Название компании',
        accessor: 'namecompany',
      },
      {
        Header: 'ИНН',
        accessor: 'inn',
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
    <section className="counterparties">
      <div className="container__counterparties">
        <div className="counterparties__header">
          <span className="counterparties__header-info">Информация о контрагентах</span>
        </div>
        <table className="counterparties__table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className="counterparties__table-header-row" key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="counterparties__table-header-cell" key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
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
              <td colSpan={columns.length} className='counterparties__add-cell'>
                <button className="counterparties__add-button" onClick={openPopup}>
                  Добавить контрагента
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isPopupOpen && <CounterpartiesPopup addRow={addRow} closePopup={closePopup} />}
    </section>
  );
};