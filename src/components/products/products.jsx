import React, { useCallback, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './products.css'
import { ProductsPopup } from './productsPopup'

export const ProductTable = () => {
  const [data, setData] = useState(useMemo(() => [
    { id: 1, name: 'Product 1', lobid: 'LOB1', risks: ['Risk A', 'Risk B'], managerId: 'Кирилл' },
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
        accessor: 'name',
      },
      {
        Header: 'Линия бизнеса',
        accessor: 'lobid',
      },
      {
        Header: 'Риски',
        accessor: 'risks',
        Cell: ({ value }) => {
          if (Array.isArray(value)) {
            return value.map(risk => risk.name).join(', ');
          } else if (typeof value === 'string') {
            return value;
          } else if (value) {
            return value.name;
          } else {
            return '';
          }
        }
      },
      {
        Header: 'Менеджер',
        accessor: 'manager',
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
    <section className="products">
      <div className="container__products">
        <div className="products__header">
          <span className="products__header-info">Информация о продуктах</span>
        </div>
        <table className="products__table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className="products__table-header-row" key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="products__table-header-cell" key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
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
              <td colSpan={columns.length} className='products__add-cell'>
                <button className="products__add-button" onClick={openPopup}>
                  Добавить продукт
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isPopupOpen && <ProductsPopup addRow={addRow} closePopup={closePopup} />}
    </section>
  );
};
