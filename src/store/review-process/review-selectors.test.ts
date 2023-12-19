import { NameSpace } from '../../const';
import { makeFakeStoreReview } from '../../services/mocks';
import { getFilmReviews } from './selectors';

describe('Review process slice', () => {
  const state = {
    [NameSpace.Review]: makeFakeStoreReview()
  };

  it('should get reviews from state', () => {
    const { filmReviews } = state[NameSpace.Review];
    const result = getFilmReviews(state);
    expect(result).toEqual(filmReviews);
  });
});
