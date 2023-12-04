import { AxiosInstance } from 'axios';
import { AppDispatch, State } from './../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmCardType, SelectedFilmType } from '../types/main';
import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './action';
import { dropToken, saveToken } from '../services/token';
import { AuthData, UserInfo } from '../types/user';
import { AddReviewFilmType, FilmReview, SimilarFilm } from '../types/films';

export const fetchFilmsAction = createAsyncThunk<FilmCardType[], undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<FilmCardType[]>(APIRoute.Films);
    return data;
  },
);

export const fetchFilmInfoAction = createAsyncThunk<SelectedFilmType, string,{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFilmInfo',
  async (id, {extra: api}) => {
    const {data} = await api.get<SelectedFilmType>(`${APIRoute.Films}/${id}`);
    return data;
    //dispatch(redirectToRoute(AppRoute.PageNotFound));
  },
);

export const fetchFilmReviews = createAsyncThunk<FilmReview, string,{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFilmReview',
  async (id, {extra: api}) => {
    const {data} = await api.get<FilmReview>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const fetchSimilarFilms = createAsyncThunk<SimilarFilm[], string,{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFilmReview',
  async (id, {extra: api}) => {
    const {data} = await api.get<SimilarFilm[]>(`${APIRoute.Films}/${id}/similar`);
    return data;
  },
);

export const addFilmReview = createAsyncThunk<void, AddReviewFilmType, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/addFilmReview',
  async ({id, comment, rating}, {extra: api}) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-template-expressions
    await api.post(`${APIRoute.Comments}/${id}`, {comment, rating});
  }
);

export const checkAuthAction = createAsyncThunk<string, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const data = await api.get<UserInfo>(APIRoute.Login);
    return data.data.avatarUrl;
  }
);

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const data = await api.post<UserInfo>(APIRoute.Login, {email, password});
    saveToken(data.data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data.data.avatarUrl;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
