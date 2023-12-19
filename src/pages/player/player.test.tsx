import { render, screen } from '@testing-library/react';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Player from './player';
import { SelectedFilmItem } from '../../mocks/films';

describe('PlayerPage', () => {
  const mockHistory = createMemoryHistory();
  const { withStoreComponent } = withStore(
    withHistory(
      <Routes>
        <Route path={AppRoute.Player} element={<Player />}></Route>
      </Routes>,
      mockHistory
    ),
    makeFakeStore()
  );
  mockHistory.push(`/player/${SelectedFilmItem.id}`);

  it('renders correctly', () => {
    render(withStoreComponent);

    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByText('Toggler')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Full screen')).toBeInTheDocument();
  });

  it('plays video', async () => {
    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('videoControl'));

    expect(screen.getByText('Pause')).toBeInTheDocument();
  });
});
