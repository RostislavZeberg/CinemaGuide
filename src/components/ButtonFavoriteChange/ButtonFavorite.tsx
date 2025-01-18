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

  // switch (favoriteMovie) {
  //   case true:
  //     return (
  //       <button
  //         onClick={handlerDeleteMovie}
  //         className="random__btn favourites btn-reset"
  //       >
  //         <svg
  //           width="24"
  //           height="24"
  //           viewBox="0 0 20 19"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0Z"
  //             fill="#B4A9FF"
  //           />
  //         </svg>
  //       </button>
  //     );
  //   case false:
  //     return (
  //       <button
  //         onClick={handlerAddMovie}
  //         className="random__btn favourites btn-reset"
  //       >
  //         <span className="favourites__icon" />
  //       </button>
  //     );
  // }

  return (
    <button
      onClick={favoriteMovie ? handlerDeleteMovie : handlerAddMovie}
      className="random__btn favorite btn-reset"
    >
      <svg
        className="favorite"
        width="24"
        height="24"
        viewBox={!favoriteMovie ? "0 0 24 24" : "0 0 20 20"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d={favoriteMovie ? "M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0Z"
            :
            "M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"}
          fill={favoriteMovie ? "#B4A9FF" : "white"}
        />
      </svg>
    </button>
  )
};
