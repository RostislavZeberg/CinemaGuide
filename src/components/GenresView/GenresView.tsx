import { FC } from "react";
import { Link } from "react-router-dom";

import { FetchImageGenreMovie } from "./FetchImageGenreMovie";

import "./GenresView.css";

export interface GenresViewProps {
  genre: string;
}

export const GenresView: FC<GenresViewProps> = ({ genre }) => {
  
  return (
    <Link to={`/genre`} state={{ genre: genre }}  className="genres__movie card">
      <FetchImageGenreMovie genre={genre} />
      <div className="card__bottom">
        <h2 className="card__title">{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
      </div>
    </Link>
  );
};
