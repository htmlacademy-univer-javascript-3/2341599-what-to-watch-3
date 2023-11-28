import { FilmCardType } from '../types/main';
import { AppRoute, AuthorizationStatus, GenresValues } from './../const';
import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<GenresValues>('genre/changeGenre');

export const getFilms = createAction('movies/get');

export const loadFilms = createAction<FilmCardType[]>('data/loadFilms');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const loadAuthorPreview = createAction<string | null>('user/loadAuthorPreview');

export const setError = createAction<string | null>('movies/setError');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');
