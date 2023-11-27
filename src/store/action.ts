import { FilmCardType } from '../types/main';
import { AuthorizationStatus, GenresValues } from './../const';
import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<GenresValues>('genre/changeGenre');

export const getFilms = createAction('movies/get');

export const loadFilms = createAction<FilmCardType[]>('data/loadFilms');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('movies/setError');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');
