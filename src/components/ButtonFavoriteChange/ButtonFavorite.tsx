import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { FC, useEffect, useState } from "react";
import { Movie } from "../../api/Movie";
import { addMovie, deleteMovie } from "../../api/FavoritesMovies";
import { fetchMe } from "../../api/User";

interface buttonFavoriteProps {
  movie: Movie;
}

export const ButtonFavorite: FC<buttonFavoriteProps> = ({ movie }) => {
  const [favoriteMovie, setFavoriteMovie] = useState(false);

  const FavoriteQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ["users", "me"],
      retry: 0,
    },
    queryClient
  );

  useEffect(() => {
    if (FavoriteQuery.data?.favorites != undefined) {
      for (let i = 0; i < FavoriteQuery.data?.favorites.length; i++) {
        if (FavoriteQuery.data?.favorites[i] === String(movie.id)) {
          setFavoriteMovie(true);
        }
      }
    }
  }, [FavoriteQuery.data?.favorites, movie.id]);

  const addMovieMutation = useMutation(
    {
      mutationFn: () => addMovie(movie.id),
      retry: 0,
    },
    queryClient
  );

  const deleteMovieMutation = useMutation(
    {
      mutationFn: () => deleteMovie(movie.id),
      retry: 0,
    },
    queryClient
  );

  const handlerAddMovie = () => {
    addMovieMutation.mutate();
    setFavoriteMovie(true);
  };

  const handlerDeleteMovie = () => {
    deleteMovieMutation.mutate();
    setFavoriteMovie(false);
  };

  switch (favoriteMovie) {
    case true:
      return (
        <button
          onClick={handlerDeleteMovie}
          className="random__btn favourites btn-reset"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0Z"
              fill="#B4A9FF"
            />
          </svg>
        </button>
      );
    case false:
      return (
        <button
          onClick={handlerAddMovie}
          className="random__btn favourites btn-reset"
        >
          <span className="favourites__icon" />
        </button>
      );
  }
};
