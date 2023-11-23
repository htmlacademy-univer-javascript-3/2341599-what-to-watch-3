import { Helmet } from 'react-helmet-async';
import { SelectedFilmType } from '../../types/main';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import FilmOverview from '../../components/filmOverview/filmOverview';
import FilmDetails from '../../components/filmDetails/filmDetails';
import FilmReviews from '../../components/filmReviews/filmReviews';
import { SeeReviewFilmType } from '../../types/films';
import { useState } from 'react';
import { getFlimsOfGenre } from '../../utils/flimsList';
import { CardsFilm } from '../../mocks/films';
import FilmList from '../../components/filmsList/filmList';

type FilmProps = {
  selectedFilm: SelectedFilmType;
  seeReviewsFilm: Array<SeeReviewFilmType>;
}

export default function Film({selectedFilm, seeReviewsFilm}:FilmProps): JSX.Element{

  const [pageNow, setPageNow] = useState('Overview');

  const getStarring = (): string=>{
    let result = '';
    selectedFilm.starring.map((element, index)=>{
      if (index + 1 !== selectedFilm.starring.length){
        result += `${element}, `;
      } else{
        result += element;
      }
    });
    return result;
  };

  const getPage = () => {
    if (pageNow === 'Overview'){
      return <FilmOverview rating={selectedFilm.rating} scoresCount={selectedFilm.scoresCount} starringList={getStarring()} description={selectedFilm.description} director={selectedFilm.director}/>;
    } else if (pageNow === 'Details'){
      return <FilmDetails/>;
    }
    return <FilmReviews seeReviewsFilm={seeReviewsFilm}/>;
  };

  return (
    <>
      <Helmet>
        <title>Film</title>
      </Helmet>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={AppRoute.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

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

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{selectedFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{selectedFilm.genre}</span>
                <span className="film-card__year">{selectedFilm.released}</span>
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
                <Link to={AppRoute.AddReview} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={selectedFilm.posterImage} alt={`${selectedFilm.name} poster`} width="218" height="327" />
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
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          {<FilmList filmsSection={8} filmsList={getFlimsOfGenre(CardsFilm, selectedFilm.genre)}/>}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
