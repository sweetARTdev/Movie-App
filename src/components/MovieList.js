import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import heroimage from '../assets/Header.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Styled header component
const Header = styled.header`
  text-align: center;
  
`;

// Styled hero image
const HeroImage = styled.img`
  max-width: 100%;
  width:100vw;
  height: auto;
`;

const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 360px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }
`;


const Title = styled.h3`
  font-size: 22px;
  margin: 10px auto;
  text-align: center;

  @media (max-width: 360px) {
    font-size: 18px; /* Adjust font size for smaller screens */
  }
`;


const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  img {
    width: 100%;
    git
  }
`;

const MovieList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleMoviesClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiKey = '12cd22d5bde79dba5e1637b5fb1bddf4';

    axios
      .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header>
        <HeroImage src={heroimage} alt="hero" />
      </Header>
      <Title>Featured Movies</Title>
      <GridContainer>
        {movies.slice(0, 10).map((movie) => (
          <Card data-testid='movie-card' key={movie.id} onClick={() => handleMoviesClick(movie.id)}>
            <img data-testid="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
            <h3 data-testid="movie-title">{movie.title}</h3>
            <p data-testid="movie-release-date">{movie.release_date}</p>
          </Card>
        ))}
      </GridContainer>
    </>
  );
};

export default MovieList;
