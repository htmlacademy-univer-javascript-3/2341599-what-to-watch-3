import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchChangeFilmStatus } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useState } from 'react';

type ChangeBtnProps = {
  id: string;
  isFavorite: boolean;
  filmLength: number;
};

export default function ChangeFavoriteButton({ id, isFavorite, filmLength }: ChangeBtnProps) {
  const [newFilmLength, setNewFilmLength] = useState(filmLength);
  const [newIsFavorite, setNewIsFavorite] = useState(isFavorite);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={() => {
        if (authorizationStatus !== AuthorizationStatus.Auth) {
          navigate(AppRoute.SignIn);
        } else {
          dispatch(
            fetchChangeFilmStatus({
              id: id,
              status: Number(!newIsFavorite),
            })
          );
          setNewIsFavorite(!newIsFavorite);
          setNewFilmLength(newIsFavorite ? newFilmLength - 1 : newFilmLength + 1);
        }
      }}
    >
      {newIsFavorite ? (
        <svg width="18" height="14" viewBox="0 0 18 14" data-testid="inList">
          <use xlinkHref="#in-list"></use>
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20" data-testid="add">
          <use xlinkHref="#add"></use>
        </svg>
      )}

      <span>My list</span>
      <span className="film-card__count">{newFilmLength}</span>
    </button>
  );
}
