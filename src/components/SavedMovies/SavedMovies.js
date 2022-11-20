import React from "react";
import FilteredCheckbox from "../FilteredCheckbox/FilteredCheckbox";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import likedMovies from "../../utils/likedMovies";
import "./SavedMovies.css";

function SavedMovies({ isLoggedIn, setFilter, isFilterMovies }) {
    
  function changeFilter() {
    setFilter();
  }

  return (
    <section className="saved-movies">
      <div className="saved-movies__container">
        <Header isLoggedIn={isLoggedIn} isMain={false} isProfile={false} isMovies={false} isSavedMovies={true} />
        <SearchForm />
        <FilteredCheckbox isFilterMovies={isFilterMovies} changeFilter={changeFilter} />
        <MoviesCardList moviesList={likedMovies} isSaved={true} />
        <Footer />
      </div>
    </section>
  );
}

export default SavedMovies;
