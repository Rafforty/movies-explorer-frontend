import React from "react";
import "./SearchForm.css";

function SearchForm() {
    
  return (
    <form className="search-form">
      <input className="search-form__input" type="text" placeholder="Фильм" required minLength="2" />
      <button className="search-form__button" type="submit">
        Поиск
      </button>
    </form>
  );
}

export default SearchForm;
