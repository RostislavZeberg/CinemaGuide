import { FC, useContext, useEffect, useState } from "react";
import { ModalTrailerContext } from "../../api/Context";
import { Movie } from "../../api/Movie";

interface ButtonTrailerProps {
  movie: Movie;
  onClick: (name: number) => void;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  btnTrailerView: string;
}

export const ButtonTrailer: FC<ButtonTrailerProps> = ({
  movie,
  onClick,
  setPlay,
  btnTrailerView,
}) => {
  const [btnTrailer, setBtnTrailer] = useState("");

  useEffect(() => {
    setBtnTrailer(btnTrailerView);
  }, [btnTrailerView, setBtnTrailer]);

  const { setModalTrailer } = useContext(ModalTrailerContext);

  const handlerBtnStartModal = () => {
    setModalTrailer(true);
    onClick(movie.id);
    setPlay(true);
  };
  return (
    <button
      id="myButton"
      onClick={handlerBtnStartModal}
      value={movie.id}
      className={
        btnTrailer === "movieRandom"
          ? "random__btn random__btn-style btn-trailer btn-reset"
          : "random__btn random__btn-style btn-trailer btn-reset btn-trailer-mob"
      }
    >
      Трейлер
    </button>
  );
};
