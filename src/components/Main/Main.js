import React from "react";
import "./Main.css";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function Main({ isLoggedIn }) {
    
  return (
    <main>
      <Promo
        isLoggedIn={isLoggedIn}
        isMain={true}
        isMovies={false}
        isSavedMovies={false}
        isProfile={false}
      />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  );
}

export default Main;
