import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import { SearchErrorAdvice, SHORT_MOVIE_DURATION } from "../../utils/constants";

function MoviesCardList({ 
  moviesList,  
  isSaved, 
  isLoading, 
  savedMovies, 
  deleteMovieFromSaved, 
  saveMovie, 
  foundError, 
  serverError,
}) {

  return (
    <section className="movies-card-list">
      <Preloader isLoading={isLoading}/>
      <span className="search-form__advice">{foundError ? "Ничего не найдено =(" : ""}</span>
      <span className="server__error">{serverError ? SearchErrorAdvice : ""}</span>
      <ul className="movies__list">
        {moviesList.map((movies) => {
          return (
            <MoviesCard
              key={isSaved ? movies.movieId : movies.id}
              movies={movies}
              isSaved={isSaved}
              savedMovies={savedMovies}
              deleteMovieFromSaved={deleteMovieFromSaved}
              saveMovie={saveMovie}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
