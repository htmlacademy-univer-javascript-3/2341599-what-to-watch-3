import { render, screen } from '@testing-library/react';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';
import { Genres, GenresValues, NameSpace } from '../../const';
import { CardsFilm } from '../../mocks/films';
import FilmCatalog from './film-catalog';

describe('FilmsCatalog', () => {
  const filmPreview = CardsFilm[0];

  it('renders correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FilmCatalog />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByTestId(Genres.All)).toBeInTheDocument();
    expect(screen.getByTestId(Genres.All)).toHaveClass(
      'catalog__genres-item--active'
    );
    expect(screen.getByTestId(filmPreview.genre)).toBeInTheDocument();
  });

  it('selects correct genre', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FilmCatalog />),
      makeFakeStore({
        [NameSpace.Genre]: { genre: filmPreview.genre as GenresValues },
      })
    );

    render(withStoreComponent);

    expect(screen.getByTestId(filmPreview.genre)).toHaveClass(
      'catalog__genres-item--active'
    );
  });
});
