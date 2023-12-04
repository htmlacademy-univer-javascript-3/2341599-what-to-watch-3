import { NameSpace } from '../../const';
import { FilmReview } from '../../types/films';
import { State } from '../../types/state';

export const getFilmReviews = (state: State): FilmReview =>
  state[NameSpace.Review].filmReviews;

export const getFilmReviewLoadStatus = (state: State): boolean =>
  state[NameSpace.Review].isFilmReviewsLoading;
