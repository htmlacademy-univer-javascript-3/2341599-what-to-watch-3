import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilms } from '../../store/film-process/selectors';
import { getGenre } from '../../store/genres-process/selectors';
import { Genres, GenresValues } from '../../const';
import { changeGenre } from '../../store/genres-process/genre-process';
import FilmList from '../films-list/film-list';
import ShowMoreButton from '../show-more-button/show-more-button';

const FILM_SECTION = 8;

export default function FilmCatalog() {
  const dispatch = useAppDispatch();
  const [filmsLength, setFilmsLength] = useState(FILM_SECTION);
  const selectedGenre = useAppSelector(getGenre);
  const films = useAppSelector(getFilms);
  const filteredFilms = useMemo(
    () =>
      films.filter((film) =>
        selectedGenre === Genres.All
          ? film
          : film.genre === selectedGenre
      ),
    [films, selectedGenre]
  );
  const genres = [...new Set(films.map((film) => film.genre))].sort();
  genres.unshift(Genres.All);
  function handleShowMoreClick() {
    setFilmsLength(
      filmsLength + FILM_SECTION > films.length
        ? films.length
        : filmsLength + FILM_SECTION
    );
  }
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        {genres.map((genre) => (
          <li
            key={genre}
            onClick={() => {
              dispatch(changeGenre(genre as GenresValues));
            }}
            data-testid={genre}
            style={{ cursor: 'pointer' }}
            className={`catalog__genres-item ${selectedGenre === genre ? 'catalog__genres-item--active' : ''}`}
          >
            <a className="catalog__genres-link">{genre}</a>
          </li>))}
      </ul>
      <FilmList filmsSection={filmsLength} filmsList={filteredFilms} />

      <ShowMoreButton isDisplay={filmsLength < filteredFilms.length} onClick={handleShowMoreClick}/>
    </section>
  );
}
