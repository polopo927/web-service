import React, { useEffect, useRef, useState } from 'react';
import './productsPopup.css';
import { RisksPopup } from './risksPopup';

export const ProductsPopup = ({ addRow, closePopup }) => {
  const initialFormState = { name: '', lobid: '', manager: '' };
  const [formData, setFormData] = useState(initialFormState);
  const popupRef = useRef(null);
  const [isRisksPopupOpen, setIsRisksPopupOpen] = useState(false);
  const [risksToAdd, setRisksToAdd] = useState([]);
  const [riskName, setRiskName] = useState('');

  const openRisksPopup = () => {
    setIsRisksPopupOpen(true);
  };

  const closeRisksPopup = () => {
    setIsRisksPopupOpen(false);
  };

  const addRisks = (newRisk) => {
    setRiskName(newRisk.name);
    setRisksToAdd([newRisk]);
    closeRisksPopup();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = Date.now();
    addRow({ ...formData, id: newId, risks: risksToAdd });
    setFormData(initialFormState);
    setRiskName('');
    setRisksToAdd([])
    closePopup();
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closePopup]);

  return (
    <div className="products__popup-overlay">
      <div className='products__popup-content' ref={popupRef}>
        <div className="products__popup">
          <h3>Добавление продукта</h3>
          <div className='container__products-popup'>
            <form onSubmit={handleSubmit}>
              <ul className='products__popup-items'>
                <li className='products__popup-item'>
                  <label htmlFor="name">Имя</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </li>
                <li className='products__popup-item'>
                  <label htmlFor="name">Линия бизнеса</label>
                  <input type="text" id="lobid" name="lobid" value={formData.lobid} onChange={handleChange} required />
                </li>
                <li className='products__popup-item'>
                  <label htmlFor="name">Менеджер</label>
                  <input type="text" id="manager" name="manager" value={formData.manager} onChange={handleChange} required />
                </li>
                <li className='products__popup-item'>
                  <label htmlFor="name">Риски</label>
                  <input type="text" id="risks" name="risks" value={riskName} onChange={handleChange} disabled />
                </li>
              </ul>
              <button type='button' className='products__popup-add' onClick={openRisksPopup}>
                <span className='products__popup-add-span'>Добавить риск<span className='products-span'>+</span></span>
              </button>
              <button type="submit" className="products__popup-button">Добавить</button>
              <button onClick={closePopup} className="products__popup-button">Закрыть</button>
            </form>
          </div>
          {isRisksPopupOpen && (
            <RisksPopup addRisks={addRisks} closePopup={closeRisksPopup} />
          )}
        </div>
      </div>
    </div>
  );
};