import { render, screen } from '@testing-library/react';

import { withHistory } from '../../services/mocks';
import FilmList from './film-list';
import { CardsFilm } from '../../mocks/films';

describe('FilmList', () => {
  it('renders correctly', () => {
    render(
      withHistory(
        <FilmList
          filmsSection={CardsFilm.length}
          filmsList={CardsFilm}
        />
      )
    );

    expect(screen.getAllByRole('article')).toHaveLength(20);
  });
});
