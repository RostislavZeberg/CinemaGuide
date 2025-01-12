import { FC } from "react";
import { MovieList } from "../../api/Movie";
import { MovieView } from "../MovieView";
import "./BestMovies.css";

interface BestMovieProps {
  bestMovie: MovieList;
}

export const BestMovies: FC<BestMovieProps> = ({ bestMovie }) => {
  let count: number = 0;
  
  function counter() {
    count += 1;
    return count;
  }

  return (
    <div className="main__best best">
      <h2 className="best__title">Топ 10 фильмов</h2>
      <ul className="best__list list-movie list-reset">
        {bestMovie.map((movie) => (
          <li key={movie.id} className="">
            <MovieView movie={movie} number={counter()} />
          </li>
        ))}
      </ul>
    </div>
  );
};
