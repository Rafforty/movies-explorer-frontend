import React from "react";
import moviesList from "../../utils/moviesList";
import FilteredCheckbox from "../FilteredCheckbox/FilteredCheckbox";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ isLoggedIn, setFilter, isFilterMovies }) {

  function changeFilter() {
    setFilter();
  }

  return (
    <section className="movies">
      <Header isLoggedIn={isLoggedIn} isMain={false} isMovies={true} isSavedMovies={false} isProfile={false} />
      <SearchForm />
      <FilteredCheckbox isFilterMovies={isFilterMovies} changeFilter={changeFilter} />
      <MoviesCardList moviesList={moviesList} isSaved={false} />
      <button type="button" className="movies__button">
        Ещё
      </button>
      <Footer />
    </section>
  );
}

export default Movies;
