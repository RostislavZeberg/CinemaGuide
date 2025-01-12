import { useQuery } from "@tanstack/react-query";
import { fetchRandomMovie } from "../../api/Movie";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";
import { RandomMovie } from "./RandomMovie";
import { FC } from "react";

interface FetchRandomMovieProps {
  onClick: (name: number) => void;
  setAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
  logInQueryStatus: unknown;
  setUpdateRandomMovie: React.Dispatch<React.SetStateAction<number>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FetchRandomMovie: FC<FetchRandomMovieProps> = ({
  onClick,
  setAuthForm,
  logInQueryStatus,
  setUpdateRandomMovie,
  setPlay
}) => {
  
  const randomMovieQuery = useQuery(
    {
      queryFn: () => fetchRandomMovie(),
      queryKey: ["randomMovie"],
    },
    queryClient
  );

  switch (randomMovieQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return (
        <RandomMovie
          movie={randomMovieQuery.data}
          onClick={onClick}
          setAuthForm={setAuthForm}
          logInQueryStatus={logInQueryStatus}
          setUpdateRandomMovie={setUpdateRandomMovie}
          setPlay={setPlay}
        />
      );
    case "error":
      return (
        <div>
          <span>Произошла ошибка</span>
          <button onClick={() => randomMovieQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};
