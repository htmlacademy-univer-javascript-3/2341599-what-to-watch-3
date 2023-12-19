import { render, screen } from '@testing-library/react';
import { SeeRevFilm } from '../../mocks/see-review-film';
import FilmReviews from './film-reviews';

describe('Component: ReviewsTab', () => {
  it('renders correctly', () => {
    const expectedReview = SeeRevFilm[0];

    render(<FilmReviews seeReviewsFilm={SeeRevFilm} />);

    expect(screen.getAllByTestId('review')).toHaveLength(1);
    expect(screen.getByText(expectedReview.comment)).toBeInTheDocument();
    expect(screen.getByText(expectedReview.user)).toBeInTheDocument();
    expect(screen.getByText(expectedReview.rating)).toBeInTheDocument();
  });
});
