import { FC, useState } from "react";

import { FetchBestMovies } from "../../components/BestMovies";
import { FetchRandomMovie } from "../../components/RandomMovie";
import { ScrollToTop } from "../../components/ScrollToTop";

import "./MainPage.css";

interface MainPagerProps {
  onClick: (name: number) => void;
  setAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
  logInQueryStatus: unknown;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainPage: FC<MainPagerProps> = ({
  onClick,
  setAuthForm,
  logInQueryStatus,
  setPlay
}) => {

  const [updateRandomMovie, setUpdateRandomMovie] = useState(1);

  return (
    <div className="main">
      <ScrollToTop />
      <FetchRandomMovie
        key={updateRandomMovie}
        onClick={onClick}
        setAuthForm={setAuthForm}
        logInQueryStatus={logInQueryStatus}
        setUpdateRandomMovie={setUpdateRandomMovie}
        setPlay={setPlay}
      />
      <FetchBestMovies />
    </div>
  );
};
