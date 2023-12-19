import { render, screen } from '@testing-library/react';
import { extractActionTypes, makeFakeStore, withHistory, withStore } from '../../services/mocks';
import ChangeFavoriteButton from './change-favorite-button';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../const';
import userEvent from '@testing-library/user-event';
import { fetchChangeFilmStatus } from '../../store/api-actions';
import { SelectedFilmItem } from '../../mocks/selected-film';
import { MemoryHistory, createMemoryHistory } from 'history';

describe('changeFavorite', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it ('changes favorite status on click', async () => {
    const withHistoryComponent = withHistory(<ChangeFavoriteButton id="1" isFavorite={SelectedFilmItem.isFavorite ? SelectedFilmItem.isFavorite : false} filmLength={1} />,
      mockHistory);

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          avatarUrl: '',
        },
      })
    );

    render(withStoreComponent);
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/1/1`).reply(200);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionTypes(mockStore.getActions());
    expect(actions).toEqual([
      fetchChangeFilmStatus.pending.type,
      fetchChangeFilmStatus.fulfilled.type,
    ]);
  });

  it('shows in list svg if SelectedFilm is in my list', () => {
    const withHistoryComponent = withHistory(<ChangeFavoriteButton id="1" isFavorite filmLength={1} />,
      mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId('inList')).toBeInTheDocument();
  });

  it('shows add svg if SelectedFilm is not in my list', () => {
    const withHistoryComponent = withHistory(<ChangeFavoriteButton id="1" isFavorite={SelectedFilmItem.isFavorite ? SelectedFilmItem.isFavorite : false} filmLength={1} />,
      mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId('add')).toBeInTheDocument();
  });
});
