import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gettingFilmDetails } from 'services/filmDetails';
import css from './MovieDetails.module.css';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    gettingFilmDetails(movieId).then(setMovie);
  }, [movieId]);

  const options = { style: 'currency', currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('ru-RU', options);
  const posterPath = 'https://image.tmdb.org/t/p/w500';
  const location = useLocation();
  const navigation = useNavigate();

  const onBackClick = () => {
    navigation(location.state?.from ?? '/');
  };
  if (!movie) return null;

  const {
    poster_path,
    original_title,
    tagline,
    budget,
    production_companies,
    release_date,
    overview,
  } = movie;
  return (
    movie && (
      <div className={css.movieDetail}>
        <button type="button" className={css.button} onClick={onBackClick}>
          Go back
        </button>
        <div className={css.filmWrap}>
          <img
            src={posterPath + poster_path}
            alt={original_title + ' poster'}
            className={css.filmImg}
          />
          <div className={css.filmInfo}>
            <h3 className={css.title}>{original_title}</h3>
            <p className={css.text}>
              <b>Tagline: </b>"{tagline}"
            </p>
            <p className={css.text}>
              <b>Budget: </b>
              {numberFormat.format(budget)}
            </p>
            <p className={css.text}>
              <b>Genres: </b>
              {movie.genres.map(genre => genre.name).join(', ')}
            </p>
            <p className={css.text}>
              <b>Production companies: </b>
              {production_companies
                .map(production_companie => production_companie.name)
                .join(', ')}
            </p>
            <p className={css.text}>
              <b>Release date : </b>
              {release_date}
            </p>
            <p className={css.text}>
              <b>Description: </b>
              {overview}
            </p>
            <Link to="cast" className={css.link}>
              Cast
            </Link>
            <Link to="reviews" className={css.link}>
              Reviews
            </Link>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    )
  );
};
