import { FC, useContext, useEffect, useState } from "react";

import { FetchModalTrailer } from "./FetchModalTrailer";
import { ModalTrailerContext } from "../../api/Context";

import "./ModalTrailer.css";

interface ModalTrailerProps {
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalTrailer: FC<ModalTrailerProps> = ({ play, setPlay }) => {
  const { modalTrailer, setModalTrailer } = useContext(ModalTrailerContext);
  const [updateTrailer, setUpdateTrailer] = useState(0);

  const handlerBtnCloseModal = () => {
    setModalTrailer(false);
    setPlay(false);
  };

  useEffect(() => {
    if (modalTrailer) setUpdateTrailer(Math.random());
  }, [setUpdateTrailer, modalTrailer]);

  return (
    <div className={modalTrailer ? "modal active" : "modal"}>
      <div
        className={modalTrailer ? "modal__content active" : "modal__content"}
      >
        <FetchModalTrailer key={updateTrailer} play={play} setPlay={setPlay} />
        <button
          onClick={handlerBtnCloseModal}
          className="modal__close btn-reset"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
