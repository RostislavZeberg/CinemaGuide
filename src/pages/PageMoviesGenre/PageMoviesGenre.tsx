import { Link, useLocation } from "react-router-dom";

import { FetchPageMoviesGenre } from "./FetchPageMoviesGenre";

import "./PageMoviesGenre.css";

export const PageMoviesGenre = () => {
  const location = useLocation();

  if (location.state !== null) {
    const { genre } = location.state;
    return (
      <div className="movies-genre">
        <Link
          className="movies-genre__title-link"
          to={`/genres`}
          style={{ display: "flex", alignItems: "center" }}
        >
          <svg
            className="movies-genre__title-icon"
            width="14"
            height="22"
            viewBox="0 0 14 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.04701 11.0012L13.2967 19.2507L10.9397 21.6077L0.333008 11.0012L10.9397 0.394531L13.2967 2.75155L5.04701 11.0012Z"
              fill="white"
            />
          </svg>
          <h2 className="movies-genre__title">
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </h2>
        </Link>
        <FetchPageMoviesGenre genre={genre} />
      </div>
    );
  }
};
