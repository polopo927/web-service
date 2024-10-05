import React, { useEffect, useRef, useState } from 'react';
import './counterpartiesPopup.css';

export const CounterpartiesPopup = ({ addRow, closePopup }) => {
  const initialFormState = { personType: 'individual', firstname: '', lastname: '', dateofbirth: '', namecompany: '', inn: '' };
  const [formData, setFormData] = useState(initialFormState);
  const popupRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePersonTypeChange = (e) => {
    setFormData({
      ...initialFormState,
      personType: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = Date.now();
    addRow({ ...formData, id: newId });
    setFormData(initialFormState);
    closePopup();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup()
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closePopup])

  const isIndividual = formData.personType === 'individual';

  return (
    <div className='counterparties__popup-overlay'>
      <div className='counterparties__popup-content' ref={popupRef}>
        <div className="counterparties__popup">
          <div className='container__counterparties-popup'>
            <form onSubmit={handleSubmit}>
              <div className='counterparties__popup-type'>
                <label className='counterparties__popup-type-text'>Лицо</label>
                <select name="personType" value={formData.personType} onChange={handlePersonTypeChange}>
                  <option value="individual">Физ. Лицо</option>
                  <option value="legal">Юр. Лицо</option>
                </select>
              </div>
              <ul className='counterparties__popup-items'>
                <li className='counterparties__popup-item'>
                  <label htmlFor="name">Имя</label>
                  <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
                </li>
                <li className='counterparties__popup-item'>
                  <label htmlFor="name">Фамилия</label>
                  <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />
                </li>
                <li className='counterparties__popup-item'>
                  <label htmlFor="name">Дата рождения</label>
                  <input type="text" id="dateofbirth" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
                </li>
                {!isIndividual && (
                  <>
                    <li className='counterparties__popup-item'>
                      <label htmlFor="name">Название компании</label>
                      <input type="text" id="namecompany" name="namecompany" value={formData.namecompany} onChange={handleChange} required />
                    </li>
                  </>
                )}
                <li className='counterparties__popup-item'>
                  <label htmlFor="name">ИНН</label>
                  <input type="text" id="inn" name="inn" value={formData.inn} onChange={handleChange} required />
                </li>
              </ul>
              <button type="submit" className="counterparties__popup-button">Добавить</button>
              <button onClick={closePopup} className="counterparties__popup-button">Закрыть</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};