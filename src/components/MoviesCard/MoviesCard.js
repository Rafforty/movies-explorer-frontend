import React from "react";
import "./MoviesCard.css";

function MoviesCard({ movies, isSaved }) {
  
  const [isLike, setIsLike] = React.useState(movies.isLikeCard);

  function changeLikeCard() {
    setIsLike(!isLike);
  }

  return (
    <li className="movies-card">
      <img className="movies-card__image" alt={movies.nameRU} src={movies.image} />
      <div className="movies-card__container">
        <p className="movies-card__movies-name">{movies.nameRU}</p>
        {isSaved ? (
          <button type="button" className={movies.owner === 1 ? "movies-card__movies-delete-button" : ""}></button>
        ) : (
          <button type="button" onClick={changeLikeCard} className={isLike ? "movies-card__movies-like movies-card__movies-like_active" : "movies-card__movies-like movies-card__movies-like_inactive"}></button>
        )}
      </div>
      <p className="movies__length">{movies.duration}</p>
    </li>
  );
}

export default MoviesCard;
