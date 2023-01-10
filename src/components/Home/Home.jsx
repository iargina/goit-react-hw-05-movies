import { gettingPopularFilm } from 'services/filmApi';
import { useState, useEffect } from 'react';
import css from './Home.module.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [filmLibrary, setFilms] = useState([]);

  useEffect(() => {
    gettingPopularFilm().then(result => {
      setFilms([...result]);
      return;
    });
  }, []);
  const path = 'https://image.tmdb.org/t/p/w500';
  const filmPath = '/movies/';
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
      </ul>
    </div>
  );
};
