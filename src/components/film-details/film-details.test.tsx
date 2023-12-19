import { render, screen } from '@testing-library/react';
import FilmDetails from './film-details';
import { SelectedFilmItem } from '../../mocks/films';

describe('Component: DetailsTab', () => {
  it('renders correctly', () => {
    render(<FilmDetails film={SelectedFilmItem} />);

    expect(screen.getByText(SelectedFilmItem.director)).toBeInTheDocument();
    expect(screen.getByText(SelectedFilmItem.genre)).toBeInTheDocument();
    expect(screen.getByText(SelectedFilmItem.released)).toBeInTheDocument();
  });
});
