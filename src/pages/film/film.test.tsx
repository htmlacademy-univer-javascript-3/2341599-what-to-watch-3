import { render, screen } from '@testing-library/react';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import Film from './film';
import { SelectedFilmItem } from '../../mocks/films';

describe('FilmPage', () => {
  it('renders correctly', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoute.Film} element={<Film />}></Route>
        </Routes>,
        mockHistory
      ),
      makeFakeStore()
    );
    mockHistory.push(`/films/${SelectedFilmItem.id}`);

    render(withStoreComponent);

    expect(screen.getByAltText(SelectedFilmItem.name)).toBeInTheDocument();
    expect(screen.getByText(SelectedFilmItem.name)).toBeInTheDocument();
    expect(screen.getByText(SelectedFilmItem.genre)).toBeInTheDocument();
    expect(screen.getByText(SelectedFilmItem.released)).toBeInTheDocument();
    expect(screen.getByAltText(`${SelectedFilmItem.name} poster`)).toBeInTheDocument();
    expect(screen.queryByText('Add review')).not.toBeInTheDocument();
  });

  it('shows add review button when user is authorized', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoute.Film} element={<Film />}></Route>
        </Routes>,
        mockHistory
      ),
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          avatarUrl: '',
        },
      })
    );
    mockHistory.push(`/films/${SelectedFilmItem.id}`);

    render(withStoreComponent);

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});
