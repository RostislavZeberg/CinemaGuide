import { FC, useState } from "react";

import { MovieList } from "../../api/Movie";
import { GenreMovieView } from "./GenreMovieView";
import { ScrollToTop } from "../ScrollToTop";

import "./GenreMovieView.css";

export interface GenreMovieProps {
  genreMovies: MovieList;
}

export const GenreMoviesView: FC<GenreMovieProps> = ({ genreMovies }) => {
  const [sizeList, setSizeList] = useState(10);
  const [showBtnMoreMovie, setShowBtnMoreMovie] = useState(true);

  const handlerSizeList = () => {
    setSizeList((sizeList): number => {
      const newSizeList: number = sizeList + 10;
      if (newSizeList >= genreMovies.length) {
        setShowBtnMoreMovie(false);
      }
      return newSizeList;
    });
  };

  return (
    <div className="page-genres">
      <ScrollToTop />
      <ul className="list-movie page-genres__list list-reset">
        {genreMovies.slice(0, sizeList).map((movie) => (
          <li key={movie.id} className="">
            <GenreMovieView movie={movie} />
          </li>
        ))}
      </ul>
      <button
        onClick={handlerSizeList}
        className={
          showBtnMoreMovie ? "auth-form__button btn-reset" : "btn-none"
        }
      >
        Показать ещё
      </button>
    </div>
  );
};
