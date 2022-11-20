import React from "react";
import "./AboutProject.css";

function AboutProject() {
  
  return (
    <section className="project" id="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__container">
        <div className="project__block">
          <h3 className="project__block-title">Дипломный проект включал 5 этапов</h3>
          <p className="project__block-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="project__block">
          <h3 className="project__block-title">На выполнение диплома ушло 5 недель</h3>
          <p className="project__block-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="project__time">
        <p className="project__time-title project__time-title_back">1 неделя</p>
        <p className="project__time-title project__time-title_front">4 недели</p>
      </div>
      <div className="project__time-subtitle_container">
        <p className="project__time-subtitle project__time-subtitle_back">Back-end</p>
        <p className="project__time-subtitle project__time-subtitle_front">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
