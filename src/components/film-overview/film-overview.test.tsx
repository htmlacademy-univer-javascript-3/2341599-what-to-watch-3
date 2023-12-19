import { render, screen } from '@testing-library/react';
import FilmOverview from './film-overview';
import { SelectedFilmItem } from '../../mocks/films';

describe('Component: OverviewTab', () => {
  it('renders correctly', () => {
    render(<FilmOverview film={SelectedFilmItem} />);

    expect(screen.getByText(SelectedFilmItem.rating)).toBeInTheDocument();
    expect(
      screen.getByText(`${SelectedFilmItem.scoresCount} ratings`)
    ).toBeInTheDocument();
    expect(screen.getByText(SelectedFilmItem.description)).toBeInTheDocument();
    expect(
      screen.getByText(`Director: ${SelectedFilmItem.director}`)
    ).toBeInTheDocument();
  });
});
