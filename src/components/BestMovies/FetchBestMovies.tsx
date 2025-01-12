import { useQuery } from "@tanstack/react-query";
import { fetchBestMovies } from "../../api/Movie";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";
import { BestMovies } from "./BestMovies";

export const FetchBestMovies = () => {
  const bestMoviesQuery = useQuery(
    {
      queryFn: () => fetchBestMovies(),
      queryKey: ["bestMovie"],
    },
    queryClient
  );

  switch (bestMoviesQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <BestMovies bestMovie={bestMoviesQuery.data} />;
    case "error":
      return (
        <div>
          <span style={{color: 'white', marginRight: '5px'}}>Произошла ошибка</span>
          <button style={{cursor: 'pointer'}} onClick={() => bestMoviesQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};