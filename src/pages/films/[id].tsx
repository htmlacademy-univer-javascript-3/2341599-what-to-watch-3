import { Helmet } from 'react-helmet-async';
import { Link, generatePath, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import FilmOverview from '../../components/filmOverview/filmOverview';
import FilmDetails from '../../components/filmDetails/filmDetails';
import FilmReviews from '../../components/filmReviews/filmReviews';
import { useState, useEffect } from 'react';
import FilmList from '../../components/filmsList/filmList';
import { fetchFilmInfoAction, fetchFilmReviews, fetchSimilarFilms} from '../../store/apiActions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';


export default function Film(): JSX.Element{

  const [pageNow, setPageNow] = useState('Overview');
  const {id} = useParams();
  const authorizationStatus = useAppSelector((state)=>state.AuthorizationStatus);
  const authorAvatar = useAppSelector((state)=>state.authorPreview);
  const film = useAppSelector((state)=>state.filmInfo);
  const similarFilms = useAppSelector((state)=>state.similarFilms);
  const filmReviews = useAppSelector((state)=>state.filmReviews);
  const isFilmLoading = useAppSelector((state)=>state.isFilmInfoLoading);
  const dispatch = useAppDispatch();

  useEffect(()=> {
    if (id){
      dispatch(fetchSimilarFilms(id));
      dispatch(fetchFilmReviews(id));
      dispatch(fetchFilmInfoAction(id));
    }
  }, [dispatch, id]);

  const getStarring = (): string=>{
    let result = '';
    if (film){
      film.starring.map((element, index)=>{
        if (index + 1 !== film.starring.length){
          result += `${element}, `;
        } else{
          result += element;
        }
      });
    }
    return result;
  };

  const getPage = () => {
    if (pageNow === 'Overview' && film){
      return <FilmOverview rating={film.rating} scoresCount={film.scoresCount} starringList={getStarring()} description={film.description} director={film.director}/>;
    } else if (pageNow === 'Details' && film){
      return <FilmDetails director={film.director} starring={film.starring} runTime={film.runTime} genre={film.genre} released={film.released}/>;
    }
    return <FilmReviews seeReviewsFilm={filmReviews}/>;
  };

  if (isFilmLoading){
    return <Spinner/>;
  }

  return (
    <>
      <Helmet>
        <title>Film</title>
      </Helmet>
      {film &&
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          {authorAvatar && <Header authorizationStatus={authorizationStatus} authorAvatar={authorAvatar}/>}
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref='#play-s' href="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref='#add' href="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth && id && <Link to={generatePath(AppRoute.AddReview, {id: id})} className="btn film-card__button">Add review</Link>}
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
                  <li style={{cursor: 'pointer'}} className={`film-nav__item ${pageNow === 'Overview' ? 'film-nav__item--active' : ''}`}>
                    <a className="film-nav__link" onClick={()=>{
                      setPageNow('Overview');
                    }}
                    >Overview
                    </a>
                  </li>
                  <li style={{cursor: 'pointer'}} className={`film-nav__item ${pageNow === 'Details' ? 'film-nav__item--active' : ''}`}>
                    <a className="film-nav__link" onClick={()=>{
                      setPageNow('Details');
                    }}
                    >Details
                    </a>
                  </li>
                  <li style={{cursor: 'pointer'}} className={`film-nav__item ${pageNow === 'Reviews' ? 'film-nav__item--active' : ''}`}>
                    <a className="film-nav__link" onClick={()=>{
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
          {film && <FilmList filmsSection={8} filmsList={similarFilms}/>}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
