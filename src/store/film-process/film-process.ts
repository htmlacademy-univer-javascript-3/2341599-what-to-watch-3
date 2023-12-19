
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmProcess } from '../../types/state';
import { fetchFilmInfoAction, fetchFilmsAction, fetchMyList, fetchPromoFilm, fetchSimilarFilms } from '../api-actions';

const initialState:FilmProcess = {
  films: [],
  filmInfo: null,
  promoFilm: null,
  myList: [],
  similarFilms: [],
  isFilmsDataLoading: false,
  isFilmInfoLoading: false,
  isSimilarFilmsLoading: false,
  isPromoFilmLoading: false,
  isMyListLoading: false
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.isFilmsDataLoading = false;
        state.films = action.payload;
      })
      .addCase(fetchFilmInfoAction.pending, (state) => {
        state.isFilmInfoLoading = true;
      })
      .addCase(fetchFilmInfoAction.fulfilled, (state, action) => {
        state.filmInfo = action.payload;
        state.isFilmInfoLoading = false;
      })
      .addCase(fetchPromoFilm.pending, (state) => {
        state.isPromoFilmLoading = true;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isPromoFilmLoading = false;
      })
      .addCase(fetchMyList.pending, (state) => {
        state.isMyListLoading = true;
      })
      .addCase(fetchMyList.fulfilled, (state, action) => {
        state.myList = action.payload;
        state.isMyListLoading = false;
      })
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.isSimilarFilmsLoading = true;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isSimilarFilmsLoading = false;
      });
  },
});
