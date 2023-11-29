import { AddReviewFilmType, FilmReview, SimilarFilm } from '../types/films';
import { FilmCardType, SelectedFilmType } from '../types/main';
import { AppRoute, AuthorizationStatus, GenresValues } from './../const';
import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<GenresValues>('genre/changeGenre');

export const getFilms = createAction('movies/get');

export const loadFilms = createAction<FilmCardType[]>('data/loadFilms');

export const loadFilmInfo = createAction<SelectedFilmType>('data/loadFilmInfo');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const loadAuthorPreview = createAction<string | null>('user/loadAuthorPreview');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');

export const setFilmInfoDataLoadingStatus = createAction<boolean>('data/setFilmInfoDataLoadingStatus');

export const setFilmReviewData = createAction<FilmReview[]>('data/setFilmReviewDataLoading');

export const setFilmSimilarData = createAction<SimilarFilm[]>('data/setFilmSimilarDataLoading');

export const addFilmReview = createAction<AddReviewFilmType>('data/addFilmReview');

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');
