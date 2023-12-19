import { useAppDispatch } from '../../hooks';
import { fetchChangeFilmStatus } from '../../store/api-actions';

type ChangeBtnProps = {
  id: string;
  isFavorite: boolean;
  filmLength: number;
};

export default function ChangeFavoriteButton({ id, isFavorite, filmLength }: ChangeBtnProps) {
  const dispatch = useAppDispatch();
  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={() => {
        dispatch(
          fetchChangeFilmStatus({
            id: id,
            status: Number(!isFavorite),
          })
        );
      }}
    >
      {isFavorite ? (
        <svg width="18" height="14" viewBox="0 0 18 14" data-testid="inList">
          <use xlinkHref="#in-list"></use>
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20" data-testid="add">
          <use xlinkHref="#add"></use>
        </svg>
      )}

      <span>My list</span>
      <span className="film-card__count">{filmLength}</span>
    </button>
  );
}
