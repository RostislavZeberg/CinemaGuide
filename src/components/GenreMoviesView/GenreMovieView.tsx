import { FC } from "react";

import { Movie } from "../../api/Movie";
import { Link } from "react-router-dom";
import empty from '../../../public/empty_img.jpeg'

import "./GenreMovieView.css";

export interface GenreMovieView {
  movie: Movie;
}

export const GenreMovieView: FC<GenreMovieView> = ({ movie }) => {
  return (
    <Link to={"/movie"} state={{ movie: movie }}>
      <div className="best__movie card">
        <img
          className="card__img"
          src={movie.posterUrl ? movie.posterUrl : empty}
          alt=""
        />
      </div>
    </Link>
  );
};
