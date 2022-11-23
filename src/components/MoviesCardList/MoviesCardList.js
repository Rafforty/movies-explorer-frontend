import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ moviesList, isSaved }) {
  
  const [isLoadingMovies, setIsLoadingMovies] = React.useState(false);

  return (
    <div className="movies-card-list">
      {isLoadingMovies ? <Preloader /> : ""}
      <ul className="movies__list">
        {moviesList.map((movies) => {
          return (
            <MoviesCard
              key={movies.movieId}
              movies={movies}
              isSaved={isSaved}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default MoviesCardList;
