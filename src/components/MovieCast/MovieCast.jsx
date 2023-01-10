import { gettingFilmCast } from 'services/filmDetails';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import image from 'images/photo_not_found.jpg';

const MovieCast = () => {
  const [actors, setActors] = useState([]);

  const { movieId } = useParams();
  const actorPath = 'https://image.tmdb.org/t/p/w300';
  useEffect(() => {
    gettingFilmCast(movieId).then(response => setActors([...response]));
  }, [movieId]);
  return (
    actors.length > 0 && (
      <div className={css.actorsWrap}>
        <h3 className={css.title}>Cast</h3>
        <ul className={css.list}>
          {actors.map(actor => (
            <li key={actor.id} className={css.item}>
              {actor.profile_path ? (
                <img src={actorPath + actor.profile_path} alt={actor.name} />
              ) : (
                <img src={image} alt="no_photo" className={css.image} />
              )}

              {actor.character && (
                <p>
                  <b>Character:</b> {actor.character}
                </p>
              )}
              <p>
                <b>Name:</b> {actor.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
export default MovieCast;
