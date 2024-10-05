import React, { useEffect, useRef, useState } from 'react';
import './agentsPopup.css';

export const AgentsPopup = ({ addRow, closePopup }) => {
  const initialFormState = { ikpid: '', status: '', datecreate: '' };
  const [formData, setFormData] = useState(initialFormState);
  const popupRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFaceId = Date.now();
    addRow({ ...formData, faceid: newFaceId });
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
    <div className='agents__popup-overlay'>
      <div className='agents__popup-content' ref={popupRef}>
        <div className="agents__popup">
          <div className='container__agents-popup'>
            <form onSubmit={handleSubmit}>
              <ul className='agents__popup-items'>
                <li className='agents__popup-item'>
                  <label htmlFor="name">IKPID</label>
                  <input type="text" id="ikpid" name="ikpid" value={formData.ikpid} onChange={handleChange} required />
                </li>
                <li className='agents__popup-item'>
                  <label htmlFor="name">Status</label>
                  <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} required />
                </li>
                <li className='agents__popup-item'>
                  <label htmlFor="name">DateCreate</label>
                  <input type="text" id="datecreate" name="datecreate" value={formData.datecreate} onChange={handleChange} required />
                </li>
              </ul>
              <button type="submit" className="agents__popup-button">Добавить</button>
              <button onClick={closePopup} className="agents__popup-button">Закрыть</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};