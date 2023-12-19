import { render, screen } from '@testing-library/react';
import { withHistory } from '../../services/mocks';
import { CardsFilm } from '../../mocks/films';
import FilmCard from './film-card';

describe('FilmCard', () => {
  it('renders correctly', () => {
    const moviePreview = CardsFilm[0];

    render(
      withHistory(
        <FilmCard
          id={moviePreview.id}
          name={moviePreview.name}
          previewImage={moviePreview.previewImage}
          previewVideo={moviePreview.previewVideoLink}
        />
      )
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
