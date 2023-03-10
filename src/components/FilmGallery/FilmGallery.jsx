import css from './FilmGallery.module.css';
import { Link, useLocation } from 'react-router-dom';
const posterPath = 'https://image.tmdb.org/t/p/w500';
const filmPath = '/movies/';

export const FilmGallery = ({ filmArr }) => {
  const location = useLocation();

  return filmArr.map(film => (
    <li key={film.id} className={css.item}>
      <Link
        to={filmPath + film.id}
        className={css.link}
        state={{ from: location }}
      >
        <img src={posterPath + film.poster_path} alt="" />
      </Link>
      <h3 className={css.text}>{film.original_title}</h3>
      <p className={css.text}> Rating: {film.vote_average}</p>
    </li>
  ));
};
