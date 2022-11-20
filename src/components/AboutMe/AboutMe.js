import React from "react";
import "./AboutMe.css";
import photo from "../../images/my-photo.jpg";

function AboutMe() {
  
  return (
    <section className="about" id="about">
      <h2 className="about__job">Студент</h2>
      <div className="about__container">
        <div className="about__container_text">
          <h3 className="about__name">Савва</h3>
          <p className="about__profession">Фронтенд-разработчик, 30 лет</p>
          <p className="about__description">
            Я родился и живу в Перми. Закончил ПГСХА (ныне ПГААТУ) по специальности Землеустройство. В 2021 году решил кардинально сменить род деятельности на программирование. Вспомнились школьные эксперименты с Паскалем и как это было
            интересно. Проходя обучение в "Яндекс.Практикум" получил много новых знаний, которые точно будут полезны.
          </p>
          <div className="about__links">
            <a target="_blank" rel="noreferrer" className="about__links-items" href="https://github.com/Rafforty">
              Github
            </a>
          </div>
        </div>
        <img className="about__photo" src={photo} alt="Фото" />
      </div>
    </section>
  );
}

export default AboutMe;
