import React from "react";
import "./SearchForm.css";

function SearchForm({ isSaved, searchMovies, searchSavedMovies }) {

  const [validForm, setValidForm] = React.useState(true);
  const [textInput, setTextInput] = React.useState('');

  function handleInputChange(evt) {
    setTextInput(evt.target.value);
    setValidForm(evt.target.checkValidity());
  }

  function handleSearchMovies(evt) {
    evt.preventDefault();
    searchMovies(textInput);
  }

  function handleSearchSavedMovies(evt) {
    evt.preventDefault();
    searchSavedMovies(textInput);
  }
    
  return (
    <>
    <form className="search-form" name="search-form" onSubmit={isSaved ? handleSearchSavedMovies : handleSearchMovies} noValidate>
      <input 
        id="search"
        name="search"
        className="search-form__input" 
        onChange={handleInputChange} 
        value={textInput || ''} 
        type="text" 
        placeholder="Фильм" 
        minLength="1" 
        required
        />
      <button className="search-form__button" disabled={!validForm} type="submit">
        Поиск
      </button>
    </form>
    <span className="search-form__error">{validForm ? '' : "Нужно ввести ключевое слово"}</span>
    </>
  );
}

export default SearchForm;
