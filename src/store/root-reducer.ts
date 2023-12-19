import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { filmProcess } from './film-process/film-process';
import { genreProcess } from './genres-process/genre-process';
import { reviewProcess } from './review-process/review-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Film]: filmProcess.reducer,
  [NameSpace.Genre]: genreProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer
});
