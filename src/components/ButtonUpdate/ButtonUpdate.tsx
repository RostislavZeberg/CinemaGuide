import { FC } from "react";

interface ButtonUpdateProps {
  setUpdateRandomMovie: React.Dispatch<React.SetStateAction<number>>;
}

export const ButtonUpdate: FC<ButtonUpdateProps> = ({setUpdateRandomMovie}) => {
  const handleUpdate = () => {
    setUpdateRandomMovie(Math.random());
  };

  return (
    <button
      onClick={handleUpdate}
      className="random__btn random__btn-style update btn-reset"
    >
      <span className="update__icon" />
    </button>
  );
};
