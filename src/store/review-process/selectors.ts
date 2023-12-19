import { NameSpace } from '../../const';
import { FilmReview } from '../../types/films';
import { State } from '../../types/state';

export const getFilmReviews = (state: Pick<State, typeof NameSpace.Review>): FilmReview =>
  state[NameSpace.Review].filmReviews;

export const getFilmReviewLoadStatus = (state: Pick<State, typeof NameSpace.Review>): boolean =>
  state[NameSpace.Review].isFilmReviewsLoading;
