import { SeeRevFilm } from '../../mocks/see-review-film';
import { fetchFilmReviews } from '../api-actions';
import { reviewProcess } from './review-process';

describe('Reviews process slice', () => {
  it ('should change isFilmsDataLoading with pending action', () => {
    const expectedState = {
      filmReviews: [],
      isFilmReviewsLoading: true,
    };
    const result = reviewProcess.reducer(
      undefined,
      fetchFilmReviews.pending
    );
    expect(result).toEqual(expectedState);
  });

  it ('should change isFilmsDataLoading with fulfilled action', () => {
    const expectedState = {
      filmReviews: SeeRevFilm,
      isFilmReviewsLoading: false,
    };
    const result = reviewProcess.reducer(
      undefined,
      fetchFilmReviews.fulfilled(SeeRevFilm, '', '')
    );
    expect(result).toEqual(expectedState);
  });
});
