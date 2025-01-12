import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { queryClient } from "../../api/queryClient";
import { fetchFilterGenreMovies } from "../../api/Movie";
import { Loader } from "../../components/Loader";
import { GenreMoviesView } from "../../components/GenreMoviesView";

export interface FilterGenreMovies {
  genre: string;
}

export const FetchPageMoviesGenre: FC<FilterGenreMovies> = ({ genre }) => {
  const fetchPageMoviesGenre = useQuery(
    {
      queryFn: () => fetchFilterGenreMovies(genre),
      queryKey: ["fetchPageMoviesGenre"],
    },
    queryClient
  );

  switch (fetchPageMoviesGenre.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <GenreMoviesView genreMovies={fetchPageMoviesGenre.data} />;
    case "error":
      return (
        <div>
          <span style={{ color: "white", marginRight: "5px" }}>
            Произошла ошибка
          </span>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => fetchPageMoviesGenre.refetch()}
          >
            Повторить запрос
          </button>
        </div>
      );
  }
};
