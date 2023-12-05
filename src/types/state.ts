import { AuthorizationStatus } from './../const';
import { store } from '../store';
import { FilmCard, PromoFilm } from './main';
import { FilmReview, SimilarFilm } from './films';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  avatarUrl: string | null;
}

export type FilmProcess = {
  films: FilmCard[];
  filmInfo: PromoFilm | null;
  similarFilms: SimilarFilm[];
  promoFilm: PromoFilm | null;
  myList: FilmCard[];
  isFilmsDataLoading: boolean;
  isFilmInfoLoading: boolean;
  isSimilarFilmsLoading: boolean;
  hasError: boolean;
  isPromoFilmLoading: boolean;
  isMyListLoading: boolean;
}

export type GenreProcess = {
  genre: string;
}

export type ReviewProcess = {
  filmReviews: FilmReview;
  isFilmReviewsLoading: boolean;
}
