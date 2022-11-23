import React from "react";
import "./Footer.css";

function Footer() {
  
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__content">
          <p className="footer__copyright">&copy; {new Date().getUTCFullYear()}</p>
          <div className="footer__social-links">
            <a target="_blank" rel="noreferrer" className="footer__social-links-item" href="https://practicum.yandex.ru/">
              Яндекс.Практикум
            </a>
            <a target="_blank" rel="noreferrer" className="footer__social-links-item" href="https://github.com/Rafforty">
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
