import { useQuery } from "@tanstack/react-query";

import { fetchGetMovieId } from "../../api/Movie";
import { queryClient } from "../../api/queryClient";
import { FC, useContext } from "react";
import { Spinner } from "../../components/Spinner";
import { ModalTrailerVideo } from "./ModalTrailerVideo";
import { MovieIdContext } from "../../api/Context";

interface FetchModalTrailerProps {
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FetchModalTrailer: FC<FetchModalTrailerProps> = ({
  play,
  setPlay,
}) => {
  const movie = useContext(MovieIdContext);
  const movieId = movie.movieId;

  const modalTrailerQuery = useQuery(
    {
      queryFn: () => fetchGetMovieId(movieId),
      queryKey: ["modalTrailer"],
      retry: 0,
    },
    queryClient
  );

  switch (modalTrailerQuery.status) {
    case "pending":
      return <Spinner />;
    case "success":
      return (
        <ModalTrailerVideo
          play={play}
          setPlay={setPlay}
          movie={modalTrailerQuery.data}
        />
      );
    case "error":
      return (
        <div>
          <span style={{ marginRight: "10px" }}>Произошла ошибка</span>
          <button onClick={() => modalTrailerQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};
