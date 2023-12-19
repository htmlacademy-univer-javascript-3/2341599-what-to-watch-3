import { Helmet } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import Spinner from '../../components/spinner/spinner';
import { Link, generatePath, useParams } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFilmInfo, getFilmInfoLoadStatus } from '../../store/film-process/selectors';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';

export default function AddReview(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFilmLoading = useAppSelector(getFilmInfoLoadStatus);
  const film = useAppSelector(getFilmInfo);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }
  });

  return (
    <>
      <Helmet>
        <title>AddReview</title>
      </Helmet>
      {!isFilmLoading && film ?
        <section className="film-card film-card--full" style={{ backgroundColor: film.backgroundColor }}>
          <div className="film-card__header">
            <div className="film-card__bg">
              <img src={film.backgroundImage} alt={film.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header">
              <Logo />

              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link
                      to={generatePath(AppRoute.Film, { id: film.id })}
                      className="breadcrumbs__link"
                    >
                      {film.name}
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link">Add review</a>
                  </li>
                </ul>
              </nav>

              <UserBlock />
            </header>

            <div className="film-card__poster film-card__poster--small">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
            </div>
          </div>
          {id && <AddReviewForm id={id} />}
        </section>
        :
        <Spinner />}
    </>
  );
}
