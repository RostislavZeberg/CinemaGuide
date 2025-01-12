import { FC, useEffect } from "react";
import { Movie } from "../../api/Movie";

interface BlockContentMovieProps {
  movie: Movie;
}

export const BlockContentMovie: FC<BlockContentMovieProps> = ({ movie }) => {
  useEffect(() => {
    const ratingElement: HTMLElement | null = document.getElementById("rating");

    if (ratingElement !== null) {
      if (movie.tmdbRating >= 8) {
        ratingElement.classList.add("rating__8");
      } else if (movie.tmdbRating >= 7) {
        ratingElement.classList.add("rating__7");
      } else if (movie.tmdbRating >= 6) {
        ratingElement.classList.add("rating__6");
      } else {
        ratingElement.classList.add("rating__4");
      }
    }
  });

  const minutes: number = movie.runtime % 60;
  const hours: number = (movie.runtime - minutes) / 60;

  return (
    <div className="random__content-content">
      <ul className="random__list list-reset random-list">
        <li className="random-list__item random-list__rating" id="rating">
          <div className="rating__star"></div>
          <span className="rating__number">{movie.tmdbRating.toFixed(1)}</span>
        </li>
        <li className="random-list__item random-list__release">{movie.releaseYear}</li>
        <li className="random-list__item random-list__genres">{movie.genres.join(", ")}</li>
        <li className="random-list__item random-list__runtime">
          {hours} ч {minutes} мин
        </li>
      </ul>
      <h1 className="random__title">{movie.title}</h1>
      <p className="random__description">{movie.plot}</p>
    </div>
  );
};
