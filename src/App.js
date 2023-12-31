import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import axios from "axios";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

const App = () => {
  const [movies, setMovies] = useState([
    {
      Title: "Pirates of the Caribbean: The Curse of the Black Pearl",
      Year: "2003",
      imdbID: "tt0325980",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([
    {
      Title: "Pirates of the Caribbean: The Curse of the Black Pearl",
      Year: "2003",
      imdbID: "tt0325980",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
  ]);

  const getMovieRequest = async (searchValue) => {
    // const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1c34b055`;

    // const url = `http://www.omdbapi.com/?s=pirates&apikey=1c34b055`;
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1c34b055`;

    const { data } = await axios.get(url);
    // console.log(data.Search);
    if (data.Search) {
      console.log(`Search-${JSON.stringify(data.Search)}`);
      setMovies(data.Search);
      console.log(`movies- ${JSON.stringify(movies)}`);
    }

    // console.log(`movies- ${JSON.stringify(movies)}`);
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    // console.log(newFavouriteList);

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue, getMovieRequest]);

  useEffect(() => {
    const movieFvourites = JSON.parse(
      localStorage.getItem("react-movie-favourites")
    );
    // console.log(`lclstr-${JSON.stringify(movieFvourites)}`);
    setFavourites(movieFvourites);
  }, []);
  return (
    <div className="container-fluid movie-app">
      <div className="xrow d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="xrow">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favoritecomponent={AddFavourites}
        />
      </div>
      <div className="xrow d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="xrow">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favoritecomponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;
