import { useQuery } from "@tanstack/react-query";

import { queryClient } from "../../api/queryClient";
import { fetchListGenresMovies } from "../../api/Movie";
import { Loader } from "../../components/Loader";
import { ListGenres } from "./ListGenres";

export const FetchGenresMovies = () => {
  const genresMovieQuery = useQuery(
    {
      queryFn: () => fetchListGenresMovies(),
      queryKey: ["genresMovie"],
    },
    queryClient
  );
  switch (genresMovieQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <ListGenres genresMovie={genresMovieQuery.data} />;
    case "error":
      return (
        <div>
          <span style={{ color: "white", marginRight: "5px" }}>
            Произошла ошибка
          </span>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => genresMovieQuery.refetch()}
          >
            Повторить запрос
          </button>
        </div>
      );
  }
};