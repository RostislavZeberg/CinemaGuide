import { createContext } from "react";

type ContextMovieIdParams = { movieId: number };

export const MovieIdContext = createContext<ContextMovieIdParams>({
  movieId: (0),
});

type ContextAuthFormParams = { authForm: boolean };

export const AuthFormContext = createContext<ContextAuthFormParams>({
  authForm: false,
});

type ContextModalTrailerParams = {
  modalTrailer: boolean;
  setModalTrailer: (modalTrailer: boolean) => void;
};

export const ModalTrailerContext = createContext<ContextModalTrailerParams>({
  modalTrailer: false,
  setModalTrailer: () => {},
});
