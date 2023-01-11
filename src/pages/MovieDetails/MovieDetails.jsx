import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gettingFilmDetails } from 'services/filmDetails';
import css from './MovieDetails.module.css';
import { Link, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    gettingFilmDetails(movieId).then(
      ({
        poster_path,
        original_title,
        tagline,
        budget,
        genres,
        production_companies,
        release_date,
        overview,
      }) =>
        setMovie({
          poster_path,
          original_title,
          tagline,
          budget,
          genres,
          production_companies,
          release_date,
          overview,
        })
    );
  }, [movieId]);
  const options = { style: 'currency', currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('ru-RU', options);
  const posterPath = 'https://image.tmdb.org/t/p/w500';
  return (
    movie && (
      <>
        <div className={css.filmWrap}>
          <img
            src={posterPath + movie.poster_path}
            alt={movie.original_title + ' poster'}
            className={css.filmImg}
          />
          <div className={css.filmInfo}>
            <h3 className={css.title}>{movie.original_title}</h3>
            <p className={css.text}>
              <b>Tagline: </b>"{movie.tagline}"
            </p>
            <p className={css.text}>
              <b>Budget: </b>
              {numberFormat.format(movie.budget)}
            </p>
            <p className={css.text}>
              <b>Genres: </b>
              {movie.genres.map(genre => genre.name).join(', ')}
            </p>
            <p className={css.text}>
              <b>Production companies: </b>
              {movie.production_companies
                .map(production_companie => production_companie.name)
                .join(', ')}
            </p>
            <p className={css.text}>
              <b>Release date : </b>
              {movie.release_date}
            </p>
            <p className={css.text}>
              <b>Description: </b>
              {movie.overview}
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
      </>
    )
  );
};
