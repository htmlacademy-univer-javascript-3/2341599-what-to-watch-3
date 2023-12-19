import { render, screen } from '@testing-library/react';
import { extractActionTypes, makeFakeStore, withStore } from '../../services/mocks';
import ChangeFavoriteButton from './change-favorite-button';
import { APIRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import { fetchChangeFilmStatus } from '../../store/api-actions';
import { SelectedFilmItem } from '../../mocks/selected-film';

describe('changeFavorite', () => {
  it ('changes favorite status on click', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <ChangeFavoriteButton id="1" isFavorite={SelectedFilmItem.isFavorite ? SelectedFilmItem.isFavorite : false} filmLength={1} />,
      makeFakeStore()
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
    const { withStoreComponent } = withStore(
      <ChangeFavoriteButton id="1" isFavorite filmLength={1} />,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId('inList')).toBeInTheDocument();
  });

  it('shows add svg if SelectedFilm is not in my list', () => {
    const { withStoreComponent } = withStore(
      <ChangeFavoriteButton id="1" isFavorite={SelectedFilmItem.isFavorite ? SelectedFilmItem.isFavorite : false} filmLength={1} />,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId('add')).toBeInTheDocument();
  });
});
