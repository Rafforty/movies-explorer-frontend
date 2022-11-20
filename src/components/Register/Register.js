import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
    
  return (
    <section className="registration">
      <Link to="/" className="registration__logo"></Link>
      <h1 className="registration__title">Добро пожаловать!</h1>
      <form className="registration__form">
        <fieldset className="registration__fieldset">
          <p className="registration__text">Имя</p>
          <input className="registration__input" type="text" placeholder="Имя" required minLength="2" />
          <span className="registration__error"></span>
          <p className="registration__text">E-mail</p>
          <input className="registration__input" type="email" placeholder="email" required />
          <span className="registration__error"></span>
          <p className="registration__text">Пароль</p>
          <input className="registration__input" type="password" placeholder="password" required minLength="8" />
          <span className="registration__error"></span>
        </fieldset>
        <div className="registration__bottom">
          <button className="registration__button" type="submit">
            Зарегистрироваться
          </button>
          <div className="registration__links">
            <p className="registration__advice">Уже зарегистрированы?</p>
            <Link className="registration__link" to="/signin">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
export default Register;
