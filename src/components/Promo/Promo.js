import React from "react";
import Header from "../Header/Header";
import "./Promo.css";

function Promo({ isLoggedIn, isProfile, isMain, isMovies, isSavedMovies }) {
    
  return (
    <section className="promo">
      <Header isLoggedIn={isLoggedIn} isMain={isMain} isMovies={isMovies} isSavedMovies={isSavedMovies} isProfile={isProfile} />
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
    </section>
  );
}

export default Promo;
