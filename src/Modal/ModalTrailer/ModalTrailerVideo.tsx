import { FC } from "react";
import ReactPlayer from "react-player/youtube";
import { Movie } from "../../api/Movie";

interface ModalTrailerVideoProps {
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  play: boolean;
  movie: Movie;
}

export const ModalTrailerVideo: FC<ModalTrailerVideoProps> = ({
  movie,
  play,
  setPlay,
}) => {
  const handlerBtnStartMovie = () => {
    setPlay(true);
  };

  const handlerBtnPauseMovie = () => {
    setPlay(false);
  };

  return (
    <div className="player-block">
      <ReactPlayer
        url={movie.trailerUrl ? movie.trailerUrl : ""}
        className="player"
        playing={play}
        controls={false}
      />
      <div className="trailer-content">
        <div className="trailer-title">{movie.title}</div>
        {!play ? (
          <button
            className="modal__start btn-reset"
            onClick={handlerBtnStartMovie}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 33.6595V6.34035C10 5.0313 11.4399 4.23322 12.55 4.92702L34.4053 18.5867C35.4498 19.2393 35.4498 20.7605 34.4053 21.4133L12.55 35.0728C11.4399 35.7667 10 34.9687 10 33.6595Z"
                fill="black"
              />
            </svg>
          </button>
        ) : (
          <button
            className="modal__pause btn-reset"
            onClick={handlerBtnPauseMovie}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5H13.3333V35H10V5ZM26.6667 5H30V35H26.6667V5Z"
                fill="black"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
