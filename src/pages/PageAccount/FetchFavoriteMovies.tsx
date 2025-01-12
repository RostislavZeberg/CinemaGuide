import { useQuery } from "@tanstack/react-query";

import { queryClient } from "../../api/queryClient";
import { Loader } from "../../components/Loader";
import { fetchGetMovie } from "../../api/FavoritesMovies";
import { FavoriteMovies } from "./FavoriteMovies";

export const FetchFavoriteMovies = () => {
  const favoriteMoviesQuery = useQuery(
    {
      queryFn: () => fetchGetMovie(),
      queryKey: ["favoriteMoviesView"],
      retry: 0,
    },
    queryClient
  );

  switch (favoriteMoviesQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <FavoriteMovies favoriteMovies={favoriteMoviesQuery.data} />;
    case "error":
      return (
        <div>
          <span style={{ color: "white", marginRight: "5px" }}>
            Произошла ошибка
          </span>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => favoriteMoviesQuery.refetch()}
          >
            Повторить запрос
          </button>
        </div>
      );
  }
};
