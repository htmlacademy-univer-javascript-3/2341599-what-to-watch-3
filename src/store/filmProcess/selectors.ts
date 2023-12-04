import { NameSpace } from '../../const';
import { SimilarFilm } from '../../types/films';
import { FilmCardType, SelectedFilmType } from '../../types/main';
import { State } from '../../types/state';

export const getFilms = (state: State): FilmCardType[] =>
  state[NameSpace.Film].films;

export const getFilmInfo = (state: State): SelectedFilmType | null =>
  state[NameSpace.Film].filmInfo;

export const getSimilarFilms = (state: State): SimilarFilm[] =>
  state[NameSpace.Film].similarFilms;

export const getFilmLoadStatus = (state: State): boolean =>
  state[NameSpace.Film].isFilmsDataLoading;

export const getFilmInfoLoadStatus = (state: State): boolean =>
  state[NameSpace.Film].isFilmInfoLoading;

export const getSimilarFilmsLoadStatus = (state: State): boolean =>
  state[NameSpace.Film].isSimilarFilmsLoading;
