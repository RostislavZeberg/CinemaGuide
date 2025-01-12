import { FC } from "react";

import { MovieList } from "../../api/Movie";
import { FavoriteMoviesView } from "./FavoriteMoviesView";

interface FavoriteMoviesProps {
  favoriteMovies: MovieList;
}

export const FavoriteMovies: FC<FavoriteMoviesProps> = ({ favoriteMovies }) => {

  return (
    <div className="">
      <ul className="best__list list-movie list-reset genres">
        {favoriteMovies.map((movie) => (
          <li key={movie.id} className="">
            <FavoriteMoviesView movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};
