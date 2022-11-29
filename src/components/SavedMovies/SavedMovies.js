import React from "react";
import FilteredCheckbox from "../FilteredCheckbox/FilteredCheckbox";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

function SavedMovies({ 
  isLoggedIn,
  setFilter, 
  filter, 
  moviesList, 
  searchMovies, 
  searchSavedMovies, 
  isLoading, 
  savedMovies, 
  deleteMovieFromSaved, 
  saveMovies, 
  serverError, 
  clearAllErrors }) {
  

  React.useEffect(() => {
    clearAllErrors();
  }, [])

  return (
    <section className="saved-movies">
      <div className="saved-movies__container">
        <Header 
          isLoggedIn={isLoggedIn} 
          isMain={false} 
          isProfile={false} 
          isMovies={false} 
          isSavedMovies={true} />
        <SearchForm 
          filter={filter}
          setFilter={setFilter}
          isSaved={true}
          searchMovies={searchMovies}
          searchSavedMovies={searchSavedMovies} />
        <FilteredCheckbox 
          filter={filter} 
          setFilter={setFilter} />
        <MoviesCardList 
          moviesList={moviesList} 
          isSaved={true}
          isLoading={isLoading}
          savedMovies={savedMovies}
          deleteMovieFromSaved={deleteMovieFromSaved}
          saveMovies={saveMovies}
          foundError={false}
          serverError={serverError} />
        <Footer />
      </div>
    </section>
  );
}

export default SavedMovies;
