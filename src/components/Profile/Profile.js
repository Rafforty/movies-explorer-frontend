import React from "react";
import Header from "../Header/Header";
import "./Profile.css";

function Profile({ isLoggedIn }) {
    
  return (
    <section className="profile">
      <Header isLoggedIn={isLoggedIn} isMain={false} isProfile={true} isMovies={false} isSavedMovies={false} />
      <h1 className="profile__title">Привет, username!</h1>
      <form className="profile__form">
        <div className="profile__container">
          <div className="profile__inputs">
            <p className="profile__inputs-text">Имя</p>
            <input className="profile__input" value="username" type="text" minLength="2" required />
          </div>
          <div className="profile__inputs">
            <p className="profile__inputs-text">E-mail</p>
            <input className="profile__input" value="example@email.com" type="email" required />
          </div>
        </div>
        <div className="profile__buttons">
          <button className="profile__button-edit" type="submit">
            Редактировать
          </button>
          <button className="profile__button-exit" type="button">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
