import { z } from "zod";

export const API_URL = "https://cinemaguide.skillbox.cc";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  releaseYear: z.number().nullable(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number(),
  posterUrl: z.string().nullable(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string(),
  tmdbRating: z.number(),
  production: z.string().nullable(),
  language: z.string().nullable(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  director: z.string().nullable(),
  awardsSummary: z.string().nullable(),
});

export type Movie = z.infer<typeof MovieSchema>;

export const MovieListSchema = z.array(MovieSchema);
export type MovieList = z.infer<typeof MovieListSchema>;

export const MovieArrSchema = z.array(MovieListSchema);
export type MovieArr = z.infer<typeof MovieArrSchema>;

export function fetchBestMovies(): Promise<MovieList> {
  return fetch(`${API_URL}/movie/top10`)
    .then((response) => response.json())
    .then((data) => MovieListSchema.parse(data));
}

export function fetchRandomMovie(): Promise<Movie> {
  return fetch(`${API_URL}/movie/random`)
    .then((response) => response.json())
    .then((data) => MovieSchema.parse(data));
}

export function fetchFilterGenreMovies(genre: string): Promise<MovieList> {
  return fetch(`${API_URL}/movie?genre=${genre}`)
    .then((response) => response.json())
    .then((data) => MovieListSchema.parse(data));
}

export function fetchGetMovieId(movieId: number): Promise<Movie> {
  return fetch(`${API_URL}/movie/${movieId}`)
    .then((response) => response.json())
    .then((data) => MovieSchema.parse(data));
}

export const GenreSchema = z.string();
export type Genre = z.infer<typeof GenreSchema>;

export const GenreListSchema = z.array(GenreSchema);
export type GenreList = z.infer<typeof GenreListSchema>;

export function fetchListGenresMovies(): Promise<GenreList> {
  return fetch(`${API_URL}/movie/genres`)
    .then((response) => response.json())
    .then((data) => GenreListSchema.parse(data));
}


