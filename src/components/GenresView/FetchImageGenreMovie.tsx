import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";
import { fetchFilterGenreMovies } from "../../api/Movie";
import { ImgGenre } from "./ImgGenre";

export interface FilterGenreMovies {
  genre: string;
}

export const FetchImageGenreMovie: FC<FilterGenreMovies> = ({ genre }) => {
  const imageGenreMovie = useQuery(
    {
      queryFn: () => fetchFilterGenreMovies(genre),
      queryKey: ["imageGenreMovie"],
    },
    queryClient
  );

  switch (imageGenreMovie.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <ImgGenre imgGenre={imageGenreMovie.data} />;
    case "error":
      return (
        <div>
          <span style={{ color: "white", marginRight: "5px" }}>
            Произошла ошибка
          </span>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => imageGenreMovie.refetch()}
          >
            Повторить запрос
          </button>
        </div>
      );
  }
};
