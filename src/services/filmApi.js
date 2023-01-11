import axios from 'axios';

const API_KEY = 'e20dc8db2a19ccc0feaf13905c82de4b';

const filmsApiPopular = axios.create({
  baseURL: 'https://api.themoviedb.org/3/trending/movie/day',
  params: {
    api_key: API_KEY,
    page: 1,
    per_page: 20,
  },
});

export const gettingPopularFilm = async () => {
  const popularFilms = await filmsApiPopular.get();
  const films = popularFilms.data.results;
  const filmArr = films.map(
    ({ id, poster_path, vote_average, original_title }) => ({
      id,
      poster_path,
      vote_average,
      original_title,
    })
  );
  return filmArr;
};

export const gettingFilmsByName = async query => {
  const filmsApiSearch = axios.create({
    baseURL: 'https://api.themoviedb.org/3/search/movie',
    params: {
      api_key: API_KEY,
      page: 1,
      per_page: 20,
      query: query,
    },
  });

  const response = await filmsApiSearch.get();
  const films = response.data.results;
  const filmArr = films.map(
    ({ id, poster_path, vote_average, original_title }) => ({
      id,
      poster_path,
      vote_average,
      original_title,
    })
  );
  return filmArr;
};
