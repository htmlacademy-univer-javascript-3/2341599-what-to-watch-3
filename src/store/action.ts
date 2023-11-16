import { GenresValues } from './../const';
import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<GenresValues>('genre/changeGenre');

export const getFilms = createAction('movies/get');
