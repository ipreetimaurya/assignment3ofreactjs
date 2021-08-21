import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  let [movieinfo, setMovieinfo] = useState(null);
  let [title, setTitle] = useState("the avengers");

  useEffect(() => {
    getmovieData();
  }, []);

  function readTitle(value) {
    setTitle(value);
    // console.log(value);
  }

  function getmovieData() {
    let url = `https://omdbapi.com/?t=${title}&apikey=6f2c8112`;

    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie);
        setMovieinfo(movie);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="App">
        <h1>Movie Search</h1>

        <div className="container-btn">
          <input
            type="text"
            placeholder="Enter Movie Here"
            className="textsearch"
            onChange={(event) => {
              readTitle(event.target.value);
            }}
          />
          <button className="btnstyle" onClick={getmovieData}>
            Search
          </button>
        </div>

{
  movieinfo?.Error===undefined? (


        <div className="container">
          <div className="image-poster">
            <img src={movieinfo?.Poster} alt="img" />
          </div>
          <div className="movie-content">
            <h4>Movie Name: {movieinfo?.Title} </h4>
            <h4>Director Name: {movieinfo?.Director} </h4>
            <h4>Genre: {movieinfo?.Genre}</h4>
            <h4>Movie Plot: {movieinfo?.Plot} </h4>
            <h4>Movie Actor: {movieinfo?.Actors} </h4>
            <h4>Movie BoxOffice: {movieinfo?.BoxOffice} </h4>

          <div className="rating">
            {movieinfo?.Ratings.map((rating, index) => (
              <div key={index}>
                <strong>{rating.Source}</strong>
                <h4>{rating.Value}</h4>
              </div>
            ))}
          </div>
          </div>
        </div>
      
      ):
      (
        <h2>Moive not found </h2>
      )
}
      </div>
    </>
  );
}
