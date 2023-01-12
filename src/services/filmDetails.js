import axios from 'axios';

const API_KEY = 'e20dc8db2a19ccc0feaf13905c82de4b';
const baseURL = 'https://api.themoviedb.org/3/movie';

export const gettingFilmDetails = async movieId => {
  const filmSearch = axios.create({
    baseURL: baseURL,
    params: {
      api_key: API_KEY,
    },
  });

  const response = await filmSearch(`/${movieId}`);
  const {
    poster_path,
    original_title,
    tagline,
    budget,
    genres,
    production_companies,
    release_date,
    overview,
  } = response.data;
  return {
    poster_path,
    original_title,
    tagline,
    budget,
    genres,
    production_companies,
    release_date,
    overview,
  };
};

export const gettingFilmCast = async movieId => {
  const filmSearch = axios.create({
    baseURL: baseURL,
    params: {
      api_key: API_KEY,
    },
  });

  const response = await filmSearch(`/${movieId}/credits`);
  const cast = response.data.cast;
  return cast;
};

export const gettingFilmReviews = async movieId => {
  const filmSearch = axios.create({
    baseURL: baseURL,
    params: {
      api_key: API_KEY,
    },
  });

  const response = await filmSearch(`/${movieId}/reviews`);
  const reviews = response.data.results;
  return reviews;
};
