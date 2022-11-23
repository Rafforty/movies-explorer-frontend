import React from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile({ isLoggedIn, onLogout, editUser, profileError, setProfileError }) {

  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setValues } = useFormWithValidation();

  function editProfile(evt) {
    evt.preventDefault();
    editUser({ 
      email: values.email,
      name: values.name
    })
    resetForm();
  }

  function handleClickLogout() {
    resetForm();
    onLogout();
  }

  function handleInputChange(evt) {
    handleChange(evt);
    if (profileError.length > 0) {
      setProfileError('');
    }
  }

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues])
    
  return (
    <section className="profile">
      <Header 
        isLoggedIn={isLoggedIn} 
        isMain={false} 
        isProfile={true} 
        isMovies={false} 
        isSavedMovies={false} />
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" onSubmit={editProfile}>
        <div className="profile__container">
          <div className="profile__inputs">
            <p className="profile__inputs-text">Имя</p>
            <input className="profile__input" name="name" value={values.name || ''} pattern="[а-яА-Яa-zA-ZёË\- ]{1,}" onChange={handleInputChange} type="text" minLength="2" required />
          </div>
          <span className="profile__error">{errors.name}</span>
          <div className="profile__inputs">
            <p className="profile__inputs-text">E-mail</p>
            <input className="profile__input" name="email" value={values.email || ''} onChange={handleInputChange} type="email" required />
          </div>
          <span className="profile__error">{errors.email}</span>
        </div>
        <div className="profile__buttons">
          <span className="profile__edit-save">{profileError}</span>
          <button className={isValid ? "profile__button-edit" : "profile__button-edit profile__button-edit_disabled"} disabled={!isValid} type="submit">
            Редактировать
          </button>
          <button className="profile__button-exit" onClick={handleClickLogout} type="button">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
