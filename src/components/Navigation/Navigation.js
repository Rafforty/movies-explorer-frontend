import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import account_logo from "../../images/account_logo.svg";

function Navigation({ isLoggedIn, isMain, isMovies, isSavedMovies, isProfile }) {
  
  const [isShowBurgerMenu, setIsShowBurgerMenu] = React.useState(false);

  function showBurgerMenu() {
    setIsShowBurgerMenu(true);
  }

  function closeBurgerMenu() {
    setIsShowBurgerMenu(false);
  }

  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <>
          <div className="navigation_logged">
            <div className="navigation__links">
              <Link to="/movies" className={isMovies ? "navigation__movie navigation__movie-decoration" : "navigation__movie"}>
                Фильмы
              </Link>
              <Link to="/saved-movies" className={isSavedMovies ? "navigation__movie navigation__movie-decoration" : "navigation__movie"}>
                Сохранённые фильмы
              </Link>
            </div>
            <Link to="/profile" className={isMain ? "navigation__account navigation__account_main" : "navigation__account"}>
              Аккаунт
              <img src={account_logo} alt="logo" className="profile__logo"></img>
            </Link>
          </div>
          <button className="navigation__burger" onClick={showBurgerMenu}></button>
        </>
      ) : (
        <div className="navigation__links">
          <Link to="/signup" className={isMain ? "navigation__link" : "navigation__link"}>
            Регистрация
          </Link>
          <Link to="/signin" className="navigation__link">
            Войти
          </Link>
        </div>
      )}
      {isShowBurgerMenu ? (
        <div className="burger">
          <div className="burger__container">
            <button type="button" className="burger__close" onClick={closeBurgerMenu}></button>
            <div className="burger__links-container">
              <div className="burger__links">
                <Link className={isMain ? "burger__link burger__decoration" : "burger__link"} to="/">
                  Главная
                </Link>
                <Link className={isMovies ? "burger__link burger__decoration" : "burger__link"} to="/movies">
                  Фильмы
                </Link>
                <Link className={isSavedMovies ? "burger__link burger__decoration" : "burger__link"} to="/saved-movies">
                  Сохранённые фильмы
                </Link>
              </div>
              <Link className={isProfile ? "burger__profile burger__decoration-profile" : "burger__profile"} to="/profile">
                Аккаунт
                <img src={account_logo} alt="logo" className="profile__logo"></img>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Navigation;
