import { FC } from "react";
import { Link } from "react-router-dom";

import { Movie } from "../../api/Movie";
import empty from '../../../public/empty_img.jpeg'

interface FavoriteMoviesViewProps {
  movie: Movie;
}

export const FavoriteMoviesView: FC<FavoriteMoviesViewProps> = ({ movie }) => {

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
