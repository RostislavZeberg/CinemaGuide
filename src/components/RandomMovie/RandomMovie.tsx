import { FC, useEffect, useState } from "react";

import { Movie } from "../../api/Movie";
import { BlockContentMovie } from "../BlockContentMovie";
import { ButtonFavoriteChange } from "../ButtonFavoriteChange";

import "./RandomMovie.css";
import { ButtonTrailer } from "../ButtonTrailer";
import { ButtonUpdate } from "../ButtonUpdate";
import { Link } from "react-router-dom";

interface RandomMovieProps {
  movie: Movie;
  onClick: (name: number) => void;
  setAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
  logInQueryStatus: unknown;
  setUpdateRandomMovie: React.Dispatch<React.SetStateAction<number>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RandomMovie: FC<RandomMovieProps> = ({
  movie,
  onClick,
  setAuthForm,
  logInQueryStatus,
  setUpdateRandomMovie,
  setPlay,
}) => {
  const [btnTrailerRandom, setBtnTrailerRandom] = useState("");

  useEffect(() => {
    setBtnTrailerRandom("movieRandom");
  }, []);

  return (
    <div className="main__random random">
      <img
        className="random__img"
        src={
          movie.backdropUrl ? movie.backdropUrl : "empty_img.jpeg"
        }
        alt=""
      />
      <div className="random__content">
        <BlockContentMovie movie={movie} />
        <div className="random__bottom">
          <ButtonTrailer
            movie={movie}
            onClick={onClick}
            setPlay={setPlay}
            btnTrailerView={btnTrailerRandom}
          />
          <Link
            to={"/movie"}
            state={{ movie: movie }}
            className="random__btn random__btn-style film btn-reset"
          >
            О фильме
          </Link>
          <ButtonFavoriteChange
            setAuthForm={setAuthForm}
            movie={movie}
            logInQueryStatus={logInQueryStatus}
          />
          <ButtonUpdate setUpdateRandomMovie={setUpdateRandomMovie} />
        </div>
      </div>
    </div>
  );
};
