import { FilmCardType, SelectedFilmType } from './../types/main';
import { AuthorizationStatus, Genres } from './../const';
import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, loadAuthorPreview, loadFilmInfo, loadFilms, requireAuthorization, setFilmInfoDataLoadingStatus, setFilmReviewData, setFilmSimilarData, setFilmsDataLoadingStatus } from './action';
import { FilmReview, SimilarFilm } from '../types/films';

type InitialState = {
  genre: string;

  films: FilmCardType[];
  filmInfo: SelectedFilmType | null;
  filmReviews: FilmReview[];
  similarFilms: SimilarFilm[];

  AuthorizationStatus: AuthorizationStatus;
  authorPreview: string | null;

  isFilmsDataLoading: boolean;
  isFilmInfoLoading: boolean;


}

const initialState: InitialState = {
  genre: Genres.All,

  films: [],
  filmInfo: null,
  filmReviews: [],
  similarFilms: [],

  AuthorizationStatus: AuthorizationStatus.Unknown,
  authorPreview: null,

  isFilmsDataLoading: false,
  isFilmInfoLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadFilms, (state, action) =>{
      state.films = action.payload;
    })
    .addCase(loadFilmInfo, (state, action) =>{
      state.filmInfo = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(setFilmInfoDataLoadingStatus, (state, action) => {
      state.isFilmInfoLoading = action.payload;
    })
    .addCase(setFilmReviewData, (state, action) =>{
      state.filmReviews = action.payload;
    })
    .addCase(setFilmSimilarData, (state, action) =>{
      state.similarFilms = action.payload;
    })

    .addCase(requireAuthorization, (state, action) => {
      state.AuthorizationStatus = action.payload;
    })
    .addCase(loadAuthorPreview, (state, action) => {
      state.authorPreview = action.payload;
    });
});
