import { render, screen } from '@testing-library/react';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { Route, Routes } from 'react-router-dom';
import AddReview from './review';
import { SelectedFilmItem } from '../../mocks/films';

describe('ReviewPage', () => {
  it('renders correctly', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoute.AddReview} element={<AddReview />}></Route>
        </Routes>,
        mockHistory
      ),
      makeFakeStore()
    );
    mockHistory.push(`/films/${SelectedFilmItem.id}/review`);

    render(withStoreComponent);

    expect(screen.getByAltText(SelectedFilmItem.name)).toBeInTheDocument();
    expect(screen.getByText(SelectedFilmItem.name)).toBeInTheDocument();
    expect(screen.getByAltText(`${SelectedFilmItem.name} poster`)).toBeInTheDocument();
  });
});
