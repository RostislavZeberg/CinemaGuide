import { FC } from "react";
import { Loader } from "../../components/Loader";
import { PageAccount } from "./PageAccount";
import { fetchMe, UserLogin } from "../../api/User";

interface FavoriteMoviesProps {
  logInQueryData: UserLogin;
  logInQueryStatus: unknown;
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FetchPageAccount: FC<FavoriteMoviesProps> = ({
  logInQueryData,
  logInQueryStatus,
  setLogIn,
  setAuthForm,
}) => {
  switch (logInQueryStatus) {
    case "pending":
      return <Loader />;
    case "success":
      return (
        <PageAccount
          favoriteMovies={logInQueryData}
          setLogIn={setLogIn}
          setAuthForm={setAuthForm}
        />
      );
    case "error":
      return (
        <div>
          <span style={{ color: "white", marginRight: "5px" }}>
            Произошла ошибка
          </span>
          <button style={{ cursor: "pointer" }} onClick={() => fetchMe()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};
