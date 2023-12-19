import { render, screen } from '@testing-library/react';
import {
  makeFakeStore,
  withHistory,
  withStore,
} from '../../services/mocks';
import SelectedFilm from './selected-film';
import { SelectedFilmItem } from '../../mocks/films';
import { MemoryHistory, createMemoryHistory } from 'history';

describe('SelectedFilm', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('renders correctly', () => {
    const withHistoryComponent = withHistory(
      <SelectedFilm
        id={SelectedFilmItem.id}
        isFavorite={SelectedFilmItem.isFavorite}
        name={SelectedFilmItem.name}
        genre={SelectedFilmItem.genre}
        released={SelectedFilmItem.released}
        posterImage={SelectedFilmItem.posterImage}
      />,
      mockHistory
    );
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByTestId('playButton')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });
});
