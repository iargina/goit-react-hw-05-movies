import { gettingPopularFilm } from 'services/filmApi';
import { useState, useEffect } from 'react';
import css from './Home.module.css';
import { Link } from 'react-router-dom';

const path = 'https://image.tmdb.org/t/p/w500';
const filmPath = '/movies/';

export const Home = () => {
  const [filmLibrary, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    gettingPopularFilm().then(result => {
      setFilms([...result])
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
      return;
    });
  }, []);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {filmLibrary.map(film => (
          <li key={film.id}>
            <Link to={filmPath + film.id}>
              <img src={path + film.poster_path} alt="" />
            </Link>
            <h3>{film.original_title}</h3>
            <p> Rating: {film.vote_average}</p>
          </li>
        ))}
        {error && <p>{error}</p>}
        {loading && <h4> Loading</h4>}
      </ul>
    </div>
  );
};
