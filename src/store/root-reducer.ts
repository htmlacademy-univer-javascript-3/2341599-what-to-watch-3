import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './userProcess/userProcess';
import { filmProcess } from './filmProcess/filmProcess';
import { genreProcess } from './genresProcess/genreProcess';
import { reviewProcess } from './reviewProcess/reviewProcess';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Film]: filmProcess.reducer,
  [NameSpace.Genre]: genreProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer
});
