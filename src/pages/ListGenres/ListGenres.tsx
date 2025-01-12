import { FC } from "react";

import { GenreList } from "../../api/Movie";
import { GenresView } from "../../components/GenresView";

import "./ListGenres.css";

export interface GenresMovieProps {
  genresMovie: GenreList;
}

export const ListGenres: FC<GenresMovieProps> = ({ genresMovie }) => {
  return (
    <div className="genres-list">
      <h1 className="genres-list__title">Жанры фильмов</h1>
      <ul className="list-movie list-reset genres__list">
        {genresMovie.map((genre) => (
          <li key={genre} className="">
            <GenresView genre={genre} />
          </li>
        ))}
      </ul>
    </div>
  );
};
