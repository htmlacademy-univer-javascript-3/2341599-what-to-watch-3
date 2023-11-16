import { Genres } from '../const';
import { CardsFilm } from '../mocks/films';
import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilms } from './action';

const initialState = {
  genre: Genres.All,
  films: CardsFilm
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilms, (state) => {
      state.films = CardsFilm;
    });
});
