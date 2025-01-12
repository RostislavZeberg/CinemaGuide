import { useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";

import { BlockContentMovie } from "../../components/BlockContentMovie";
import { ButtonFavoriteChange } from "../../components/ButtonFavoriteChange";
import { ButtonTrailer } from "../../components/ButtonTrailer";
import empty from '../../../public/empty_img.jpeg'

import "./PageMovie.css";

interface PageMovieProps {
  onClick: (name: number) => void;
  setAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  logInQueryStatus: unknown;
}

export const PageMovie: FC<PageMovieProps> = ({
  setAuthForm,
  onClick,
  setPlay,
  logInQueryStatus,
}) => {
  const [btnTrailerMoviePage, setBtnTrailerMoviePage] = useState("");

  useEffect(() => {
    setBtnTrailerMoviePage("moviePage");
  }, []);

  const location = useLocation();
  const { movie } = location.state;

  let numberBudget = "";
  let numberRevenue = "";

  if (movie.budget !== null) {
    numberBudget = movie.budget
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  }

  if (movie.revenue !== null) {
    numberRevenue = movie.revenue
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  }

  return (
    <div style={{ width: "100%" }}>
      <div className="main__random random">
        <img
          className="random__img"
          src={
            movie.backdropUrl ? movie.backdropUrl : empty
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
              btnTrailerView={btnTrailerMoviePage}
            />
            <ButtonFavoriteChange
              setAuthForm={setAuthForm}
              logInQueryStatus={logInQueryStatus}
              movie={movie}
            />
          </div>
        </div>
      </div>
      <div className="description">
        <h2 className="description__title">О фильме</h2>
        <ul className="description__list list-reset">
          <li className="description__item descr">
            <div className="descr__item">Язык оригинала</div>
            <div className="descr__item point"></div>
            <div className="descr__item descr__item-value">{movie.language}</div>
          </li>
          <li className="description__item descr">
            <div className="descr__item">Бюджет</div>
            <div className="descr__item point"></div>
            <div className="descr__item descr__item-value">{numberBudget}</div>
          </li>
          <li className="description__item descr">
            <div className="descr__item">Выручка</div>
            <div className="descr__item point"></div>
            <div className="descr__item descr__item-value">{numberRevenue}</div>
          </li>
          <li className="description__item descr">
            <div className="descr__item">Режиссёр</div>
            <div className="descr__item point"></div>
            <div className="descr__item descr__item-value">{movie.director}</div>
          </li>
          <li className="description__item descr">
            <div className="descr__item">Продакшен</div>
            <div className="descr__item point"></div>
            <div className="descr__item descr__item-value">{movie.production}</div>
          </li>
          <li className="description__item descr">
            <div className="descr__item">Награды</div>
            <div className="descr__item point"></div>
            <div className="descr__item descr__item-value">{movie.awardsSummary}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
