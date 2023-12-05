import { Helmet } from 'react-helmet-async';
import { Link, generatePath, useNavigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import FilmOverview from '../../components/filmOverview/filmOverview';
import FilmDetails from '../../components/filmDetails/filmDetails';
import FilmReviews from '../../components/filmReviews/filmReviews';
import { useState, useEffect } from 'react';
import FilmList from '../../components/filmsList/filmList';
import { fetchChangeFilmStatus, fetchFilmInfoAction, fetchFilmReviews, fetchSimilarFilms } from '../../store/apiActions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';
import { getAuthorizationStatus } from '../../store/userProcess/selectors';
import { getFilmInfo, getFilmInfoLoadStatus, getMyList, getSimilarFilms, getSimilarFilmsLoadStatus } from '../../store/filmProcess/selectors';
import { getFilmReviews } from '../../store/reviewProcess/selectors';
import PageNotFound from '../pageNotFound/pageNotFound';
import Footer from '../../components/footer/footer';


export default function Film(): JSX.Element {

  const [pageNow, setPageNow] = useState('Overview');
  const { id } = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const film = useAppSelector(getFilmInfo);
  const similarFilms = useAppSelector(getSimilarFilms);
  const filmReviews = useAppSelector(getFilmReviews);
  const filmlist = useAppSelector(getMyList);
  const isFilmLoading = useAppSelector(getFilmInfoLoadStatus);
  const isSimilarFilmsLoading = useAppSelector(getSimilarFilmsLoadStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchSimilarFilms(id));
      dispatch(fetchFilmReviews(id));
      dispatch(fetchFilmInfoAction(id));
    }
  }, [dispatch, id]);

  const getStarring = (): string => {
    let result = '';
    if (film) {
      film.starring.map((element, index) => {
        if (index + 1 !== film.starring.length) {
          result += `${element}, `;
        } else {
          result += element;
        }
      });
    }
    return result;
  };

  const getPage = () => {
    if (pageNow === 'Overview' && film) {
      return <FilmOverview rating={film.rating} scoresCount={film.scoresCount} starringList={getStarring()} description={film.description} director={film.director} />;
    } else if (pageNow === 'Details' && film) {
      return <FilmDetails director={film.director} starring={film.starring} runTime={film.runTime} genre={film.genre} released={film.released} />;
    }
    return <FilmReviews seeReviewsFilm={filmReviews} />;
  };

  if (isFilmLoading || isSimilarFilmsLoading) {
    return <Spinner />;
  }
  if (!id || !film) {
    return <PageNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>Film</title>
      </Helmet>
      {film &&
        <section className="film-card film-card--full" style={{ backgroundColor: film.backgroundColor }}>
          <div className="film-card__hero">
            <div className="film-card__bg">
              <img src={film.backgroundImage} alt="The Grand Budapest Hotel" />
            </div>

            <h1 className="visually-hidden">WTW</h1>
            <Header />
            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{film.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{film.genre}</span>
                  <span className="film-card__year">{film.released}</span>
                </p>

                <div className="film-card__buttons">
                  <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/${film.id}`)}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref='#play-s' href="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list film-card__button" type="button" onClick={() => {
                    dispatch(fetchChangeFilmStatus({ id: film.id, status: Number(!film.isFavorite) }));
                    navigate(AppRoute.MyList);
                  }}
                  >
                    {film.isFavorite ?
                      <svg width="18" height="14" viewBox="0 0 18 14">
                        <use xlinkHref="#in-list"></use>
                      </svg> :
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>}
                    <span>My list</span>
                    <span className="film-card__count">{filmlist.length}</span>
                  </button>
                  {authorizationStatus === AuthorizationStatus.Auth && id && <Link to={generatePath(AppRoute.AddReview, { id: id })} className="btn film-card__button">Add review</Link>}
                </div>
              </div>
            </div>
          </div>

          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
              </div>

              <div className="film-card__desc">
                <nav className="film-nav film-card__nav">
                  <ul className="film-nav__list">
                    <li style={{ cursor: 'pointer' }} className={`film-nav__item ${pageNow === 'Overview' ? 'film-nav__item--active' : ''}`}>
                      <a className="film-nav__link" onClick={() => {
                        setPageNow('Overview');
                      }}
                      >Overview
                      </a>
                    </li>
                    <li style={{ cursor: 'pointer' }} className={`film-nav__item ${pageNow === 'Details' ? 'film-nav__item--active' : ''}`}>
                      <a className="film-nav__link" onClick={() => {
                        setPageNow('Details');
                      }}
                      >Details
                      </a>
                    </li>
                    <li style={{ cursor: 'pointer' }} className={`film-nav__item ${pageNow === 'Reviews' ? 'film-nav__item--active' : ''}`}>
                      <a className="film-nav__link" onClick={() => {
                        setPageNow('Reviews');
                      }}
                      >Reviews
                      </a>
                    </li>
                  </ul>
                </nav>
                {getPage()}
              </div>
            </div>
          </div>
        </section>}

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList filmsSection={4} filmsList={similarFilms} />
        </section>

        <Footer />
      </div>
    </>
  );
}
