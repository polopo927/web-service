import React, { useState } from 'react';
import './risksPopup.css';

export const RisksPopup = ({ addRisks, closePopup }) => {
    const [risk, setRisk] = useState({ name: '', rate: '', sum: '', premium: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRisk({ ...risk, [name]: value });
    };

    const handleSubmit = () => {
        addRisks(risk);
        closePopup();
    };

    return (
        <div className="risks__popup-overlay">
            <div className="risks__popup-content">
                <h3>Добавление риска</h3>
                <ul className='risks__popup-items'> {/* Changed class name */}
                    <li className='risks__popup-item'> {/* Added list item */}
                        <label htmlFor="name">Название риска</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={risk.name}
                            onChange={handleInputChange}
                            required
                        />
                    </li>
                    <li className='risks__popup-item'>
                        <label htmlFor="rate">Коэффициент</label>
                        <input
                            type="text"
                            id="rate"
                            name="rate"
                            value={risk.rate}
                            onChange={handleInputChange}
                            required
                        />
                    </li>
                    <li className='risks__popup-item'>
                        <label htmlFor="sum">Страховая сумма</label>
                        <input
                            type="text"
                            id="sum"
                            name="sum"
                            value={risk.sum}
                            onChange={handleInputChange}
                            required
                        />
                    </li>
                    <li className='risks__popup-item'>
                        <label htmlFor="premium">Премия</label>
                        <input
                            type="text"
                            id="premium"
                            name="premium"
                            value={risk.premium}
                            onChange={handleInputChange}
                            required
                        />
                    </li>
                </ul>

                <button type="button" onClick={handleSubmit} className="risks__popup-button">
                    Добавить риск
                </button>
                <button type="button" onClick={closePopup} className="risks__popup-button">
                    Закрыть
                </button>
            </div>
        </div>
    );
};