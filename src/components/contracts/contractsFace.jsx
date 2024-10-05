import { useCallback, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { ContractsPopupFace } from './contractsPopupFace';

export const ContractsFace = () => {
  const [data, setData] = useState(useMemo(() => [
    {
      id: 1,
      datecreate: '2024-05-15',
      datesign: '2024-05-18',
      productid: 12345,
      datebegin: '2024-05-20',
      dateend: '2025-05-19',
      premium: 15000,
      insurancesum: 500000,
      agentid: 201,
      rate: 0.03,
      commision: 450,
      status: 'Active',
      policyholderid: 1001,
      insuredpersonid: 1001,
      ownerid: 1001,
    },
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
        Header: 'Название продутка',
        accessor: 'nameproducts',
      },
      {
        Header: 'Дата начала',
        accessor: 'datebegin',
      },
      {
        Header: 'Дата окончания',
        accessor: 'dateend',
      },
      {
        Header: 'ФИО страхователя',
        accessor: 'fullnameagent',
      },
      {
        Header: 'ФИО застрахованного лица',
        accessor: 'fullnamepeople',
      },
      {
        Header: 'Цена страховки',
        accessor: 'priceinsurance',
      },
      {
        Header: 'Страховая сумма',
        accessor: 'suminsurance',
      },
      {
        Header: 'Статус',
        accessor: 'status',
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
    <section className="contracts">
      <div className="container__contracts">
        <div className="contracts__header">
          <span className="contracts__header-info">Договоры(Лицо)</span>
        </div>
        <table className="contracts__table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className="contracts__table-header-row" key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="contracts__table-header-cell" key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
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
              <td colSpan={columns.length} className='contracts__add-cell'>
                <button className="contracts__add-button" onClick={openPopup}>
                  Добавить договор (Лицо)
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isPopupOpen && <ContractsPopupFace addRow={addRow} closePopup={closePopup} />}
    </section>
  );
}
