import { NameSpace } from '../../const';
import { SimilarFilm } from '../../types/films';
import { FilmPreview, PromoFilm } from '../../types/main';
import { State } from '../../types/state';

export const getFilms = (state: State): FilmPreview[] =>
  state[NameSpace.Film].films;

export const getFilmInfo = (state: State): PromoFilm | null =>
  state[NameSpace.Film].filmInfo;

export const getSimilarFilms = (state: State): SimilarFilm[] =>
  state[NameSpace.Film].similarFilms;

export const getFilmLoadStatus = (state: State): boolean =>
  state[NameSpace.Film].isFilmsDataLoading;

export const getFilmInfoLoadStatus = (state: State): boolean =>
  state[NameSpace.Film].isFilmInfoLoading;

export const getSimilarFilmsLoadStatus = (state: State): boolean =>
  state[NameSpace.Film].isSimilarFilmsLoading;

export const getPromoFilmLoadStatus = (state: State): boolean =>
  state[NameSpace.Film].isPromoFilmLoading;

export const getPromoFilm = (state: State): PromoFilm | null =>
  state[NameSpace.Film].promoFilm;

export const getMyListLoadStatus = (state: State): boolean =>
  state[NameSpace.Film].isMyListLoading;

export const getMyList = (state: State): FilmPreview[] =>
  state[NameSpace.Film].myList;
