import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Register({ onRegistration, clearErrors, registrationError, setRegistrationError}) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleRegistration(evt) {
    evt.preventDefault(evt);
    onRegistration({
      email: values.email,
      name: values.name,
      password: values.password
    })
    console.log(values)
    resetForm();
  }

  function handleClearErrors() {
    resetForm();
    clearErrors();
  }

  function handleInputChange(evt) {
    handleChange(evt);
    if (registrationError.length > 0) {
      setRegistrationError('');
    }
  } 
    
  return (
    <section className="registration">
      <Link to="/" className="registration__logo"></Link>
      <h1 className="registration__title">Добро пожаловать!</h1>
      <form className="registration__form" onSubmit={handleRegistration}>
        <fieldset className="registration__fieldset">
          <p className="registration__text">Имя</p>
          <input 
            className="registration__input" 
            type="text" 
            placeholder="Имя" 
            name="name" 
            value={values.name || ''} 
            onChange={handleInputChange} 
            pattern="[а-яА-Яa-zA-ZёË\- ]{1,}" 
            required 
            minLength="2" />
          <span className="registration__error">{errors.name}</span>
          <p className="registration__text">E-mail</p>
          <input 
            className="registration__input" 
            type="email" 
            placeholder="email" 
            name="email" 
            value={values.email || ''} 
            onChange={handleInputChange} 
            required />
          <span className="registration__error">{errors.email}</span>
          <p className="registration__text">Пароль</p>
          <input 
            className="registration__input" 
            type="password" 
            placeholder="password" 
            name="password" 
            value={values.password || ''} 
            onChange={handleInputChange} 
            required 
            minLength="8" />
          <span className="registration__error">{errors.password}</span>
        </fieldset>
        <div className="registration__bottom">
          <button className={isValid ? "registration__button" : "registration__button registration__button_disabled"} disabled={!isValid} type="submit">
            Зарегистрироваться
          </button>
          <div className="registration__links">
            <p className="registration__advice">Уже зарегистрированы?</p>
            <Link className="registration__link" to="/signin" onClick={handleClearErrors}>
              Войти
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
export default Register;
