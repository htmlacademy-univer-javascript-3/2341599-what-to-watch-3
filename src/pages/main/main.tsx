import { Helmet } from 'react-helmet-async';
import SelectedFilm from '../../components/selectedFilm/selectedFilm';
import { FilmCardType, SelectedFilmType } from '../../types/main';
import FilmList from '../../components/filmsList/filmList';
import { useState } from 'react';
import { getFlimsOfGenre } from '../../utils/flimsList';

type StartProps = {
  CardsFilm: Array<FilmCardType>;
  SelectedFilmItem: SelectedFilmType;
}

export default function Start({ CardsFilm, SelectedFilmItem}: StartProps): JSX.Element {

  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = [
    { name: 'All genres', value: 'All' },
    { name: 'Comedies', value: 'Comedy' },
    { name: 'Crime', value: 'Crime' },
    { name: 'Documentary', value: 'Documentary' },
    { name: 'Dramas', value: 'Drama' },
    { name: 'Horror', value: 'Horror' },
    { name: 'Kids & Family', value: 'Kids & Family' },
    { name: 'Romance', value: 'Romance' },
    { name: 'Sci-Fi', value: 'Sci-Fi' },
    { name: 'Thrillers', value: 'Thriller' }
  ];

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

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
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
        {<SelectedFilm name={SelectedFilmItem.name} genre={SelectedFilmItem.genre} posterImage={SelectedFilmItem.posterImage} released={SelectedFilmItem.released}/>}
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            {genres.map((genre) => (
              <li
                key={genre.value}
                onClick={() => setSelectedGenre(genre.value)}
                style={{ cursor: 'pointer' }}
                className={`catalog__genres-item ${selectedGenre === genre.value ? 'catalog__genres-item--active' : ''}`}
              >
                <a className="catalog__genres-link">{genre.name}</a>
              </li>))}
          </ul>
          <FilmList filmsList={getFlimsOfGenre(CardsFilm, selectedGenre)}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

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
