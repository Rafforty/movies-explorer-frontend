import React from "react";
import "./Portfolio.css";

function Portfolio() {
  
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <a className="portfolio__container" href="https://rafforty.github.io/how-to-learn/" target="_blank" rel="noreferrer">
        <p className="portfolio__item-text">Статичный сайт</p>
        <div className="portfolio__item-link"> </div>
      </a>
      <a className="portfolio__container" href="https://rafforty.github.io/russian-travel/index.html" target="_blank" rel="noreferrer">
        <p className="portfolio__item-text">Адаптивный сайт</p>
        <div className="portfolio__item-link"> </div>
      </a>
      <a className="portfolio__container" href="https://rafforty.github.io/mesto/index.html" target="_blank" rel="noreferrer">
        <p className="portfolio__item-text">Одностраничное приложение</p>
        <div className="portfolio__item-link"> </div>
      </a>
    </section>
  );
}

export default Portfolio;
