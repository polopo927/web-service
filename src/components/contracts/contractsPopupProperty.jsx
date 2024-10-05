import React, { useEffect, useRef, useState } from 'react';
import './contractsPopup.css'


export const ContractsPopupProperty = ({ addRow, closePopup }) => {
  const initialFormState = {
    nameproducts: '',
    datebegin: '',
    dateend: '',
    fullnameagent: '',
    fullnamepeople: '',
    priceinsurance: '',
    suminsurance: '',
    status: '',
  };
  const [formData, setFormData] = useState(initialFormState);
  const popupRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = Date.now();
    addRow({ ...formData, id: newId, });
    setFormData(initialFormState);
    closePopup();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closePopup])

  return (
    <div className='contracts__popup-overlay'>
      <div className='contracts__popup-content' ref={popupRef}>
        <div className="contracts__popup">
          <div className='container__contracts-popup'>
            <form onSubmit={handleSubmit}>
              <ul className='contracts__popup-items'>
                <li className='contracts__popup-item'>
                  <label htmlFor="name">Название имущества</label>
                  <input type="text" id="nameproducts" name="nameproducts" value={formData.nameproducts} onChange={handleChange} required />
                </li>
                <li className='contracts__popup-item'>
                  <label htmlFor="name">Дата начала</label>
                  <input type="text" id="datebegin" name="datebegin" value={formData.datebegin} onChange={handleChange} required />
                </li>
                <li className='contracts__popup-item'>
                  <label htmlFor="name">Дата окончания</label>
                  <input type="text" id="dateend" name="dateend" value={formData.dateend} onChange={handleChange} required />
                </li>
                <li className='contracts__popup-item'>
                  <label htmlFor="name">ФИО страхователя</label>
                  <input type="text" id="fullnameagent" name="fullnameagent" value={formData.fullnameagent} onChange={handleChange} required />
                </li>
                <li className='contracts__popup-item'>
                  <label htmlFor="name">ФИО владельца</label>
                  <input type="text" id="fullnamepeople" name="fullnamepeople" value={formData.fullnamepeople} onChange={handleChange} required />
                </li>
                <li className='contracts__popup-item'>
                  <label htmlFor="name">Цена страховки</label>
                  <input type="text" id="priceinsurance" name="priceinsurance" value={formData.priceinsurance} onChange={handleChange} required />
                </li>
                <li className='contracts__popup-item'>
                  <label htmlFor="name">Страховая сумма</label>
                  <input type="text" id="suminsurance" name="suminsurance" value={formData.suminsurance} onChange={handleChange} required />
                </li>
                <li className='contracts__popup-item'>
                  <label htmlFor="name">Статус</label>
                  <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} required />
                </li>
              </ul>
              <button type="submit" className="contracts__popup-button">Добавить</button>
              <button onClick={closePopup} className="contracts__popup-button">Закрыть</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};