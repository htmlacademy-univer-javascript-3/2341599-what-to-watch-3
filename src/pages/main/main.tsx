import { Helmet } from 'react-helmet-async';
import SelectedFilm from '../../components/selectedFilm/selectedFilm';
import { SelectedFilmType } from '../../types/main';
import { useAppSelector } from '../../hooks';
import { Genres } from '../../const';
import Header from '../../components/header/header';
import { getFilms } from '../../store/filmProcess/selectors';
import { getAuthorAvatar, getAuthorizationStatus } from '../../store/userProcess/selectors';
import FilmCatalog from '../../components/filmCatalog/filmCatalog';

type StartProps = {
  SelectedFilmItem: SelectedFilmType;
}

export default function Start({SelectedFilmItem}: StartProps): JSX.Element {
  const filmsList = useAppSelector(getFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authorAvatar = useAppSelector(getAuthorAvatar);

  const genres = [...new Set(filmsList.map((film) => film.genre))].sort();
  genres.unshift(Genres.All);

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={SelectedFilmItem.backgroundImage} alt={SelectedFilmItem.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        {authorizationStatus && <Header authorizationStatus={authorizationStatus} authorAvatar={authorAvatar}/>}
        {<SelectedFilm name={SelectedFilmItem.name} genre={SelectedFilmItem.genre} posterImage={SelectedFilmItem.posterImage} released={SelectedFilmItem.released}/>}
      </section>

      <div className="page-content">
        <FilmCatalog/>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
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
