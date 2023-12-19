import { useNavigate } from 'react-router-dom';
import ChangeFavoriteButton from '../change-favorite-button/change-favorite-button';

type SelectedFilmProps = {
  id: string;
  isFavorite: boolean | undefined;
  name: string;
  genre: string;
  released: number;
  posterImage: string;
  myListLength: number;
}

export default function SelectedFilm({ name, genre, released, posterImage, id, isFavorite, myListLength }: SelectedFilmProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>

        <div className="film-card__desc">
          <h2 className="film-card__title">{name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{genre}</span>
            <span className="film-card__year">{released}</span>
          </p>

          <div className="film-card__buttons">
            <button data-testid="playButton" className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/${id}`)}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <ChangeFavoriteButton id={id} isFavorite={isFavorite ? isFavorite : false} filmLength={myListLength}/>
          </div>
        </div>
      </div>
    </div>
  );
}
