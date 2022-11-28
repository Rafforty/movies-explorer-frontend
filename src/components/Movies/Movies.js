import React from "react";
import FilteredCheckbox from "../FilteredCheckbox/FilteredCheckbox";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {
  SCREEN_SIZE_DESKTOP_BIG, 
  SCREEN_SIZE_DESKTOP, 
  SCREEN_SIZE_TABLET, 
  NUMBER_OF_MOVIES_DESKTOP_BIG, 
  NUMBER_OF_MOVIES_DESKTOP, 
  NUMBER_OF_MOVIES_TABLET, 
  NUMBER_OF_MOVIES_ADD_DESKTOP_BIG, 
  NUMBER_OF_MOVIES_ADD_DESKTOP, 
  NUMBER_OF_MOVIES_ADD_TABLET,
  NUMBER_OF_MOVIES_ADD_MOBILE } from "../../utils/constants"

function Movies({ 
  isLoggedIn, 
  setFilter, 
  isFilterMovies, 
  moviesList, 
  searchMovies, 
  searchSavedMovies, 
  isLoading, 
  savedMovies, 
  deleteMovieFromSaved, 
  saveMovie, 
  foundError, 
  serverError, 
  clearAllErrors,
  searchText,
  resultMovies
   }) {

  React.useEffect(() => {
    clearAllErrors();
  }, []);

  function changeFilter() {
    setFilter();
  }

  const [moviesOnDisplay, setMoviesOnDisplay] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > SCREEN_SIZE_DESKTOP_BIG) {
      return NUMBER_OF_MOVIES_DESKTOP_BIG
    } else if (windowWidth >= SCREEN_SIZE_DESKTOP) {
      return NUMBER_OF_MOVIES_DESKTOP_BIG
    } else if (windowWidth >= SCREEN_SIZE_TABLET) {
      return NUMBER_OF_MOVIES_DESKTOP
    } else {
      return NUMBER_OF_MOVIES_TABLET
    }
  })

  const [numberMoviesAdd, setNumberMoviesAdd] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > SCREEN_SIZE_DESKTOP_BIG) {
      return NUMBER_OF_MOVIES_ADD_DESKTOP_BIG
    } else if (windowWidth >=SCREEN_SIZE_DESKTOP) {
      return NUMBER_OF_MOVIES_ADD_DESKTOP
    } else if (windowWidth >= SCREEN_SIZE_TABLET) {
      return NUMBER_OF_MOVIES_ADD_TABLET
    } else {
      return NUMBER_OF_MOVIES_ADD_MOBILE
    }
  })

  function onChangeWidth() {
    const windowWidth = window.innerWidth;
    if (windowWidth > SCREEN_SIZE_DESKTOP_BIG) {
      setMoviesOnDisplay(NUMBER_OF_MOVIES_DESKTOP_BIG);
      setNumberMoviesAdd(NUMBER_OF_MOVIES_ADD_DESKTOP_BIG);
    } else if (windowWidth >= SCREEN_SIZE_DESKTOP) {
      setMoviesOnDisplay(NUMBER_OF_MOVIES_DESKTOP_BIG);
      setNumberMoviesAdd(NUMBER_OF_MOVIES_ADD_DESKTOP);
    } else if (windowWidth >= SCREEN_SIZE_TABLET) {
      setMoviesOnDisplay(NUMBER_OF_MOVIES_DESKTOP);
      setNumberMoviesAdd(NUMBER_OF_MOVIES_ADD_TABLET);
    } else {
      setMoviesOnDisplay(NUMBER_OF_MOVIES_TABLET);
      setNumberMoviesAdd(NUMBER_OF_MOVIES_ADD_MOBILE);
    }
  }

    React.useEffect(() => {
      window.addEventListener('resize', onChangeWidth);

      return () => {
        window.removeEventListener('resize', onChangeWidth);
      }
    }, [])

    const moviesListRender = moviesList.slice(0, moviesOnDisplay);

    function addMoviesListRender() {
      setMoviesOnDisplay(prevState => prevState + numberMoviesAdd)
    }

  return (
    <section className="movies">
      <Header 
        isLoggedIn={isLoggedIn} 
        isMain={false} 
        isMovies={true} 
        isSavedMovies={false} 
        isProfile={false} />
      <SearchForm 
        searchText={searchText}
        isSaved={false} 
        searchMovies={searchMovies} 
        searchSavedMovies={searchSavedMovies}/>
      <FilteredCheckbox 
        isFilterMovies={isFilterMovies} 
        changeFilter={changeFilter} />
      <MoviesCardList 
        movies={resultMovies}
        moviesList={moviesListRender} 
        isSaved={false} 
        isLoading={isLoading} 
        isFilterMovies={isFilterMovies}
        savedMovies={savedMovies} 
        deleteMovieFromSaved={deleteMovieFromSaved} 
        saveMovie={saveMovie} 
        foundError={foundError} 
        serverError={serverError} />
      <button 
        type="button" 
        className={moviesListRender.length === moviesList.length ? "movies__button_invisible" : "movies__button"} 
        onClick={addMoviesListRender}>
        Ещё
      </button>
      <Footer />
    </section>
  );
};

export default Movies;
