import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchMovie() {
            const res = await fetch(`/api/movies/${id}`);
            if (res.ok) {
                const json = await res.json();
                setMovie(json.data);
            } else {
                setMovie(null);
            }
        }
        fetchMovie();
    }, [id]);

    if (!movie) return <div>Loading or movie not found...</div>;
    const releaseDate = new Date(movie.release_date).toLocaleDateString();

    return (
        <div style={{ padding: "1rem" }}>
            <button onClick={() => navigate(-1)}>Back to list</button>
            <h1>{movie.original_title}</h1>
            <p><strong>Tagline:</strong> {movie.tagline}</p>
            <p><strong>Rating:</strong> {(movie.vote_average / 10).toFixed(1)}</p>
            <p><strong>Release Date:</strong> {releaseDate}</p>
            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
            <pre>{JSON.stringify(movie, null, 2)}</pre>
        </div>
    );
}
