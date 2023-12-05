import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMyList } from '../../store/filmProcess/selectors';
import { fetchChangeFilmStatus } from '../../store/apiActions';

type SelectedFilmProps = {
  id: string;
  isFavorite: boolean | undefined;
  name: string;
  genre: string;
  released: number;
  posterImage: string;
}

export default function SelectedFilm({ name, genre, released, posterImage, id, isFavorite }: SelectedFilmProps): JSX.Element {
  const navigate = useNavigate();
  const filmList = useAppSelector(getMyList);
  const dispatch = useAppDispatch();
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
            <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/${id}`)}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <button className="btn btn--list film-card__button" type="button" onClick={() => {
              dispatch(fetchChangeFilmStatus({ id: id, status: Number(!isFavorite) }));
              navigate('/myList');
            }}
            >
              {isFavorite ?
                <svg width="18" height="14" viewBox="0 0 18 14">
                  <use xlinkHref="#in-list"></use>
                </svg> :
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>}
              <span>My list</span>
              <span className="film-card__count">{filmList.length}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
