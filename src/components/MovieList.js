import React from "react";

const MovieList = (props) => {
  const FavoriteComponent = props.favoritecomponent;

  return (
    <>
      {props.movies &&
        props.movies.map((movie, index) => (
          <div className="image-container d-flex justify-content-start m-3">
            <img src={movie.Poster} alt="movie" />
            <div
              onClick={() => {
                props.handleFavouritesClick(movie);
              }}
              className="overlay d-flex align-items-center justify-content-center"
            >
              <FavoriteComponent />
            </div>
          </div>
        ))}
    </>
  );
};

export default MovieList;
