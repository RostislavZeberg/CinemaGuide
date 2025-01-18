import { FC, useEffect } from "react";
import { Link } from "react-router-dom";

import { Movie } from "../../api/Movie";

import "./SearchMovieView.css";

export interface MovieViewProps {
  movie: Movie;
  number: number;
  setValueInput: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchMovieView: FC<MovieViewProps> = ({
  movie,
  number,
  setValueInput,
}) => {
  useEffect(() => {
    const ratingElement: HTMLElement | null = document.getElementById(
      `rating-search-${number}`
    );

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

  const searchList: HTMLElement | null = document.getElementById("search-list");
  const searchInput = document.getElementById("search-input") as HTMLInputElement | null;

  const handlerSearchList = () => {
    if (searchList !== null) searchList.classList.add("search__list-None");
    if (searchInput !== null) searchInput.value = "";
    setValueInput("");
  };

  return (
    <Link
      to={"/movie"}
      state={{ movie: movie }}
      className="search-item__wrapper"
      onClick={handlerSearchList}
    >
      <img
        className="search-item__img"
        src={movie.posterUrl ? movie.posterUrl : "/src/assets/empty_img.webp"}
        alt=""
      />
      <div className="search-item__descr">
        <ul className="search-item__list list-reset">
          <li
            className="search-item__item search-rating"
            id={`rating-search-${number}`}
          >
            <div className="search-rating__star"></div>
            <span className="search-rating__number">
              {movie.tmdbRating.toFixed(1)}
            </span>
          </li>
          <li className="search-item__item release">{movie.releaseYear}</li>
          <li className="search-item__item genres">
            {movie.genres.join(", ")}
          </li>
          <li className="search-item__item runtime">
            {hours} ч {minutes} мин
          </li>
        </ul>
        <h4 className="search-item__title">{movie.title}</h4>
      </div>
    </Link>
  );
};
