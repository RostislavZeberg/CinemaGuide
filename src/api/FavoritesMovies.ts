import { API_URL, MovieList, MovieListSchema } from "./Movie";
import { validateResponse } from "./validateResponse";

export const addMovie = (movieId: number) => {
  const id = String(movieId);
  return fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
    credentials: "include",
  })
    .then(validateResponse)
    .then(() => undefined);
};

export const deleteMovie = (movieId: number) => {
  const id = String(movieId);
  return fetch(`${API_URL}/favorites/${id}`, {
    credentials: "include",
    method: "DELETE",
  })
    .then(validateResponse)
    .then(() => undefined);
};

export function fetchGetMovie(): Promise<MovieList> {
  return fetch(`${API_URL}/favorites`, { credentials: "include" })
    .then((response) => response.json())
    .then((data) => MovieListSchema.parse(data));
}
