import { FC } from "react";

import { Loader } from "../Loader";
import { ButtonFavorite } from "./ButtonFavorite";
import { Movie } from "../../api/Movie";

interface buttonFavoriteChangeProps {
  movie: Movie;
  setAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
  logInQueryStatus: unknown;
}

export const ButtonFavoriteChange: FC<buttonFavoriteChangeProps> = ({
  setAuthForm,
  movie,
  logInQueryStatus,
}) => {
  
  const handlerEntryAccount = () => {
    setAuthForm(true);
  };

  switch (logInQueryStatus) {
    case "pending":
      return <Loader />;
    case "error":
      return (
        <button
          onClick={handlerEntryAccount}
          className="random__btn favourites btn-reset"
        >
          <span className="favourites__icon" />
        </button>
      );
    case "success":
      return (
        <ButtonFavorite
          movie={movie}
        />
      );
  }
};
