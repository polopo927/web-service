import { Link } from 'react-router-dom'
import './signIn.css'


export const SignIn = ({handleAuthe}) => {

  return (
    <form className="login">
      <div className="container__login">
        <h2 className="login__header">Вход</h2>
        <div className="login__items">
          <input className="login__item" type="Email" placeholder="Email" size="40" />
          <input className="login__item" type="password" placeholder="Введите пароль" size="30" />
        </div>
        <button className="login__button" onClick={() => handleAuthe()} type="submit">Войти</button>
        <div className="login__check-agent">
          <input className="login__check-agent-checkbox" type="checkbox" />
          <span className="login__check-agent-text">Вы Агент?</span>
        </div>
        <p className="login__text">
          Нет аккаунта?
          <Link to='/sign-up'>Зарегистрироваться</Link>
        </p>
      </div>
    </form>
  )
}