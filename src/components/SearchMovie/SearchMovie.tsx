import { useEffect, useState } from "react";
import axios from "axios";

import { SearchMovieView } from "./SearchMovieView";
import { API_URL } from "../../api/Movie";

import "./SearchMovieView.css";

export const SearchMovie = () => {
  const [searchMovie, setSearchMovie] = useState([]);
  const [valueInput, setValueInput] = useState("");

  const searchInput = document.getElementById("search-input");
  const search = document.getElementById("search");
  const searchIcon = document.getElementById("icon-mob");
  const searchExit = document.getElementById("search-exit");
  const searchList = document.getElementById("search-list");

  const searchMovieTitle = (valueInput: string) => {
    if (valueInput !== "") {
      axios
        .get(`${API_URL}/movie?count=5&title=${valueInput}`)
        .then((response) => {
          setSearchMovie(response.data);
        });
    }
  };

  const handlerSearchClear = () => {
    const searchInput = document.getElementById("search-input");
    if (searchInput !== null) {
      (searchInput  as HTMLInputElement).value = "";
    }
    setValueInput("");

    if (searchList !== null) {
      searchList.innerHTML = "";
    }
  };

  const handlerSearchExit = () => {
    const searchInput = document.getElementById("search-input");
    if (searchInput !== null) {
      (searchInput  as HTMLInputElement).value = "";
    }
    if (searchInput !== null) {
      searchInput.style.display = "none";
      search?.classList.remove("search-mob");
      searchIcon?.classList.remove("search__icon-mob");
      searchExit?.classList.remove("search__clear-exit");
    }
    setValueInput("");
  };

  const handlerSearchOpen = () => {
    if (searchInput !== null) {
      searchInput.style.display = "block";
      search?.classList.add("search-mob");
      searchIcon?.classList.add("search__icon-mob");
      searchExit?.classList.add("search__clear-exit");
    }
    setValueInput("");
  };

  useEffect(() => {
    searchMovieTitle(valueInput);
  }, [valueInput]);

  let count: number = 0;

  function counter() {
    count += 1;
    return count;
  }

  return (
    <div className="search" id="search">
      <input
        className="search__input"
        type="text"
        placeholder="Поиск"
        id="search-input"
        onChange={(event) => setValueInput(event.target.value)}
      />
      <div className="search__icon search__icon-pk">
        <svg
          className="search__icon-svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" />
        </svg>
      </div>
      <div className="search__icon " id="icon-mob">
        <svg
          onClick={handlerSearchOpen}
          className="search__icon-svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" />
        </svg>
      </div>
      <svg
        onClick={handlerSearchClear}
        className="search__clear"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
          fill="white"
          fillOpacity="0.5"
        />
      </svg>
      <svg
        onClick={handlerSearchExit}
        className="search__clear search__clear-none"
        id="search-exit"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
          fill="white"
          fillOpacity="0.5"
        />
      </svg>

      <ul
        className={
          valueInput !== "" && searchMovie.length !== 0
            ? "search__list list-reset"
            : "search__list-None"
        }
        id="search-list"
        style={{ position: "absolute" }}
      >
        {searchMovie.map((movie) => (
          <li
            className="search__list-item search-item list-reset"
            key={movie}
          >
            <SearchMovieView
              movie={movie}
              number={counter()}
              setValueInput={setValueInput}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
