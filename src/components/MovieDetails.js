import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
padding: 20px;
  background-color: #f3f3f3;
  border-radius: 10px; 
  line-height: 1.5;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MovieTitle = styled.h2`
  font-size: 28px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const MovieInfo = styled.div`
  margin-top: 10px;
  @media (max-width: 768px) {
    margin-top: 5px;
  }
`;

const MovieDetails = () => {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        setError(null);

        const apiKey = "12cd22d5bde79dba5e1637b5fb1bddf4";

        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !movie) {
        return <div>Error: {error ? error.message : "Movie not found"}</div>;
    }

    return (
        <Container>
            <section>
                <div>
                    <MovieTitle data-testid="movie-title">{movie.title}</MovieTitle>
                    <MovieInfo>
                        <p data-testid="movie-release-date">Release Date: {movie.release_date}</p>
                        <p data-testid="movie-runtime">Runtime: {movie.runtime} minutes</p>
                        <p data-testid="movie-overview">Overview: {movie.overview}</p>
                    </MovieInfo>
                </div>
            </section>
        </Container>
    );
};

export default MovieDetails;
