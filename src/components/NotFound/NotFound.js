import React from "react";
import { Link, useHistory} from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  
  const history = useHistory();

  function handleClickBack() {
    history.go(-2);
  }

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link onClick={handleClickBack} className="not-found__link" type="button">
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
