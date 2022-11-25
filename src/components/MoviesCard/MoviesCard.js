import React from "react";
import "./MoviesCard.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function MoviesCard({ movies, isSaved, savedMovies, saveMovie, deleteMovieFromSaved }) {
  
  const [isLike, setIsLike] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const checkMovieIsSaved = savedMovies.find((element) => element.nameRU === movies.nameRU && element.owner === currentUser._id);
  const movie = {
    country: movies.country || '',
    director: movies.director || '',
    duration: movies.duration || '',
    year: movies.year || '',
    description: movies.description || '',
    image: isSaved ? movies.image : `https://api.nomoreparties.co${movies.image.url}`,
    trailerLink: movies.trailerLink,
    thumbnail: isSaved ? movies.thumbnail : `https://api.nomoreparties.co${movies.image.formats.thumbnail.url}`,
    movieId: isSaved ? movies._id : movies.id,
    nameRU: movies.nameRU || '',
    nameEN: movies.nameEN || '', 
  }

  function handleLikeCard() {
    if (isLike) {
      const searchMovie = savedMovies.find((element) => element.id === movie.id)._id;
      deleteMovieFromSaved(searchMovie);
    } else {
      saveMovie(movie);
    }
    setIsLike(!isLike)
  }

  function deleteMovie() {
    deleteMovieFromSaved(movies._id);
  }

  const handleLike = (isLike, e) => (isLike ? handleLikeCard(e) : deleteMovie(e))  

  React.useEffect(() => {
    if (checkMovieIsSaved) {
      setIsLike(true);
    }
  }, [checkMovieIsSaved])

  const movieDuration = `${Math.trunc(movies.duration / 60)}ч ${movies.duration % 60}м`

  return (
    <li className="movies-card" id={isSaved ? movies._id : movies.id}>
      <a className="movies-card__trailer-link" target="_blank" rel="noreferrer" href={isSaved ? movies.trailer : movies.trailerLink}>
      <img className="movies-card__image" alt={movies.nameRU} src={isSaved ? movies.image : `https://api.nomoreparties.co${movies.image.url}`} />
      </a>
      <div className="movies-card__container">
        <p className="movies-card__movies-name">{movies.nameRU}</p>
        {isSaved ? (
          <button type="button" className={(movies.owner === currentUser._id) ? "movies-card__movies-delete-button" : ""} onClick={deleteMovie}></button>
        ) : (
          <button type="button" onClick={handleLike} className={isLike ? "movies-card__movies-like movies-card__movies-like_active" : "movies-card__movies-like movies-card__movies-like_inactive"}></button>
        )}
      </div>
      <p className="movies__length">{movieDuration}</p>
    </li>
  );
}

export default MoviesCard;
