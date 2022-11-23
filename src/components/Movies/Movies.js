import React from "react";
import FilteredCheckbox from "../FilteredCheckbox/FilteredCheckbox";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

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
  clearAllErrors }) {

  React.useEffect(() => {
    clearAllErrors();
  }, []);

  function changeFilter() {
    setFilter();
  }

  const [moviesOnDisplay, setMoviesOnDisplay] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1279) {
      return 16
    } else if (windowWidth >= 800) {
      return 12
    } else if (windowWidth >= 500) {
      return 8
    } else {
      return 5
    }
  })

  const [numberMoviesAdd, setNumberMoviesAdd] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1279) {
      return 4
    } else if (windowWidth >=800) {
      return 3 
    } else if (windowWidth >= 500) {
      return 2
    } else {
      return 2
    }
  })

  function onChangeWidth() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1279) {
      setMoviesOnDisplay(16);
      setNumberMoviesAdd(4);
    } else if (windowWidth >= 800) {
      setMoviesOnDisplay(12);
      setNumberMoviesAdd(3);
    } else if (windowWidth >= 500) {
      setMoviesOnDisplay(8);
      setNumberMoviesAdd(2);
    } else {
      setMoviesOnDisplay(5);
      setNumberMoviesAdd(2);
    }
  }

    React.useEffect(() => {
      window.addEventListener('resize', onChangeWidth);
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
        isSaved={false} 
        searchMovies={searchMovies} 
        searchSavedMovied={searchSavedMovies}/>
      <FilteredCheckbox 
        isFilterMovies={isFilterMovies} 
        changeFilter={changeFilter} />
      <MoviesCardList 
        moviesList={moviesListRender} 
        isSaved={false} 
        isLoading={isLoading} 
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
