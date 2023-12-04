
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmProcess } from '../../types/state';
import { fetchFilmInfoAction, fetchFilmsAction, fetchSimilarFilms } from '../apiActions';

const initialState:FilmProcess = {
  films: [],
  filmInfo: null,
  similarFilms: [],
  isFilmsDataLoading: false,
  isFilmInfoLoading: false,
  isSimilarFilmsLoading: false,
  hasError: false
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.isFilmsDataLoading = false;
        state.films = action.payload;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isFilmsDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchFilmInfoAction.pending, (state) => {
        state.isFilmInfoLoading = true;
      })
      .addCase(fetchFilmInfoAction.fulfilled, (state, action) => {
        state.filmInfo = action.payload;
        state.isFilmInfoLoading = false;
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
