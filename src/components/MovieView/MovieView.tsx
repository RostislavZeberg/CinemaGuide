import { FC } from "react";
import { Movie } from "../../api/Movie";
import { Link } from "react-router-dom";
import "./MovieView.css";

export interface MovieViewProps {
  movie: Movie;
  number: number;
}

export const MovieView: FC<MovieViewProps> = ({ movie, number }) => {
  return (
    <Link to={"/movie"} state={{ movie: movie }}>
      <div className="best__movie card">
        <div className="card__number">{number}</div>
        <img
          className="card__img"
          src={movie.posterUrl ? movie.posterUrl : "/src/assets/empty_img.webp"}
          alt=""
        />
      </div>
    </Link>
  );
};
