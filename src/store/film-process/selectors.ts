import { NameSpace } from './../../const';
import { SimilarFilm } from '../../types/films';
import { FilmPreview, PromoFilm } from '../../types/main';
import { State } from '../../types/state';

export const getFilms = (state: Pick<State, typeof NameSpace.Film>): FilmPreview[] =>
  state[NameSpace.Film].films;

export const getFilmInfo = (state: Pick<State, typeof NameSpace.Film>): PromoFilm | null =>
  state[NameSpace.Film].filmInfo;

export const getSimilarFilms = (state: Pick<State, typeof NameSpace.Film>): SimilarFilm[] =>
  state[NameSpace.Film].similarFilms;

export const getFilmLoadStatus = (state: Pick<State, typeof NameSpace.Film>): boolean =>
  state[NameSpace.Film].isFilmsDataLoading;

export const getFilmInfoLoadStatus = (state: Pick<State, typeof NameSpace.Film>): boolean =>
  state[NameSpace.Film].isFilmInfoLoading;

export const getSimilarFilmsLoadStatus = (state: Pick<State, typeof NameSpace.Film>): boolean =>
  state[NameSpace.Film].isSimilarFilmsLoading;

export const getPromoFilmLoadStatus = (state: Pick<State, typeof NameSpace.Film>): boolean =>
  state[NameSpace.Film].isPromoFilmLoading;

export const getPromoFilm = (state: Pick<State, typeof NameSpace.Film>): PromoFilm | null =>
  state[NameSpace.Film].promoFilm;

export const getMyListLoadStatus = (state: Pick<State, typeof NameSpace.Film>): boolean =>
  state[NameSpace.Film].isMyListLoading;

export const getMyList = (state: Pick<State, typeof NameSpace.Film>): FilmPreview[] =>
  state[NameSpace.Film].myList;
