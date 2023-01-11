import css from './Movies.module.css';
import { gettingFilmsByName } from 'services/filmApi';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilmGallery } from 'components/FilmGallery/FilmGallery';

export const Movies = () => {
  const [filmLibrary, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';

  useEffect(() => {
    if (!query) return;
    gettingFilmsByName(query)
      .then(result => {
        setFilms([...result]);
        return;
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [query]);

  const findFilm = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchQue = formData.get('searchInput');
    setSearchParams({ q: searchQue });
    return;
  };

  return (
    <div>
      <form className={css.searchForm} onSubmit={findFilm}>
        <input
          type="text"
          name="searchInput"
          className={css.input}
          placeholder="Film title"
        />
        <button type="submit" className={css.submitButton}>
          Find this film
        </button>
      </form>
      {filmLibrary.length > 0 ? (
        <div>
          <ul className={css.list}>
            <FilmGallery filmArr={filmLibrary} />
          </ul>
        </div>
      ) : (
        <p>Nothing here</p>
      )}
      {error && <p>{error}</p>}
      {loading && <h4> Loading</h4>}
    </div>
  );
};
