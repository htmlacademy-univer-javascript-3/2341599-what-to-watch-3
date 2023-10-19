import { Helmet } from 'react-helmet-async';
import { AddReviewFilmType } from '../../../types/films';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import AddReviewForm from '../../../components/addReviewForm/addReviewForm';

type AddReviewProps = {
  reviewFilm: AddReviewFilmType;
}

export default function AddReview({reviewFilm}:AddReviewProps): JSX.Element{
  return (
    <>
      <Helmet>
        <title>AddReview</title>
      </Helmet>
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={reviewFilm.backgroundImage} alt={reviewFilm.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to={AppRoute.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={AppRoute.Film} className="breadcrumbs__link">The Grand Budapest Hotel</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={reviewFilm.peviewImage} alt={`${reviewFilm.title} poster`} width="218" height="327" />
          </div>
        </div>

        <AddReviewForm/>

      </section>
    </>
  );
}
