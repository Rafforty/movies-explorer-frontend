import React from "react";
import "./SearchForm.css";

function SearchForm({ isSaved, searchMovies, searchSavedMovies }) {

  const [validForm, setValidForm] = React.useState(true);
  const [textInput, setTextInput] = React.useState("");

  function handleInputChange(evt) {
    setTextInput(evt.target.value);
    setValidForm(evt.target.checkValidity());
  }

  function handleSearchMovies(evt) {
    evt.preventDefault();
    searchMovies(textInput);
    setTextInput('');
  }

  function handleSearchSavedMovies(evt) {
    evt.preventDefault();
    searchSavedMovies(textInput);
    setTextInput('');
  }
    
  return (
    <>
    <form className="search-form" onSubmit={isSaved ? handleSearchSavedMovies : handleSearchMovies}>
      <input className="search-form__input" onChange={handleInputChange} value={textInput} type="text" placeholder="Фильм" required minLength="1" />
      <button className="search-form__button" disabled={!validForm} type="submit">
        Поиск
      </button>
    </form>
    <span className="search-form__error">{validForm ? '' : "Нужно ввести ключевое слово"}</span>
    </>
  );
}

export default SearchForm;
