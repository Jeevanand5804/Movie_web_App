import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./listMovies.css";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch("/api/movies");
      const json = await res.json();
      setMovies(json.data);
    }
    fetchMovies();
  }, []);

  return (
    <div className="movie-list-container">
      {movies.map(({ id, original_title, tagline, vote_average }) => (
        <Link to={`/movie/${id}`} key={id} className="movie-card">
          <h3>{original_title}</h3>
          <p>{tagline}</p>
          <p>Rating: {(vote_average / 10).toFixed(1)}</p>
        </Link>
      ))}
    </div>
  );
}
