import { Link } from 'react-router-dom'
import './signUp.css'

export const SignUp = () => {
  return (
    <form className="registration ">
      <div className="container__registration">
        <h2 className="registration__header">Регистрация</h2>
        <div className="registration__items">
          <input className="registration__item" type="Email" placeholder="Email" size="40" />
          <input className="registration__item" type="password" placeholder="Введите пароль" size="40" />
          <input className="registration__item" type="password" placeholder="Повторите пароль" size="40" />
        </div>
        <button className="registration__button">Зарегистрироваться</button>
        <p className="registration__text">
           Уже есть аккаунт? 
           <Link to='/sign-in'>Войти</Link>
        </p>
      </div>
    </form>
  )
}