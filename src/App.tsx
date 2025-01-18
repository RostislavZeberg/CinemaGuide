import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { MainPage } from "./pages/MainPage";
import { FetchGenresMovies } from "./pages/ListGenres/FetchGenresMovies";
import { PageMoviesGenre } from "./pages/PageMoviesGenre";
import { PageMovie } from "./pages/PageMovie";
import { ModalTrailer } from "./Modal/ModalTrailer";
import { ModalTrailerContext, MovieIdContext } from "./api/Context";
import { ScrollToTop } from "./components/ScrollToTop";
import { AccountPort } from "./components/AccountPort";
import { fetchMe, UserLogin } from "./api/User";
import { queryClient } from "./api/queryClient";
import { FetchPageAccount } from "./pages/PageAccount";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./App.css";

export const App = () => {
  const [modalTrailer, setModalTrailer] = useState(false);
  const [movieId, setMovieId] = useState(0);
  const [authForm, setAuthForm] = useState(false);
  const [logIn, setLogIn] = useState(true);
  const [play, setPlay] = useState(true);

  let logInQueryData: UserLogin = {
    name: "",
    surname: "",
    email: "",
    favorites: [],
  };

  const handleModalActive = (name: number) => {
    setMovieId(name);
  };

  const logInQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ["users", "me"],
      retry: 0,
    },
    queryClient
  );

  if (logInQuery.data != undefined) {
    logInQueryData = logInQuery.data;
  }

  return (
    <BrowserRouter basename='/CinemaGuide/'>
      <ScrollToTop />
      <div className="wrapper">
        <Header setAuthForm={setAuthForm} logIn={logIn} logInQuery={logInQuery.data} />
        <MovieIdContext.Provider value={{ movieId }}>
          <ModalTrailerContext.Provider value={{ modalTrailer, setModalTrailer }}>
            <div className="section">
              <main className="main">
                <div className="container">
                  <Routes>
                    <Route path="/" element={<MainPage
                      onClick={handleModalActive}
                      setAuthForm={setAuthForm}
                      logInQueryStatus={logInQuery.status}
                      setPlay={setPlay} />} />
                    <Route path="/genres" element={<FetchGenresMovies />} />
                    <Route path="/genre" element={<PageMoviesGenre />} />
                    <Route path="/movie" element={<PageMovie
                      setAuthForm={setAuthForm}
                      onClick={handleModalActive}
                      logInQueryStatus={logInQuery.status}
                      setPlay={setPlay} />} />
                    <Route path="/account" element={<FetchPageAccount
                      logInQueryData={logInQueryData}
                      logInQueryStatus={logInQuery.status}
                      setLogIn={setLogIn}
                      setAuthForm={setAuthForm} />} />
                  </Routes>
                </div>
              </main>
            </div>

            <ModalTrailer play={play} setPlay={setPlay} />
            <AccountPort
              modalActive={authForm}
              setModalActive={setAuthForm}
              setLogIn={setLogIn}
              logInQueryStatus={logInQuery.status} />
          </ModalTrailerContext.Provider>
        </MovieIdContext.Provider>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
