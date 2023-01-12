import { gettingPopularFilm } from 'services/filmApi';
import { useState, useEffect } from 'react';
import css from './Home.module.css';
import { FilmGallery } from 'components/FilmGallery/FilmGallery';

export const Home = () => {
  const [filmLibrary, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    gettingPopularFilm()
      .then(result => {
        setFilms([...result]);
        return;
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        <FilmGallery filmArr={filmLibrary}/>
        {error && <p>{error}</p>}
        {loading && <h4> Loading</h4>}
      </ul>
    </div>
  );
};
