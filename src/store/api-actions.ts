import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChangeFilmStatus, FilmPreview, PromoFilm } from '../types/main';
import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './action';
import { saveToken } from '../services/token';
import { AuthData, UserInfo } from '../types/user';
import { AddReviewFilm, FilmReview, SimilarFilm } from '../types/films';

export const fetchFilmsAction = createAsyncThunk<FilmPreview[], undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'film/fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<FilmPreview[]>(APIRoute.Films);
    return data;
  },
);

export const fetchFilmInfoAction = createAsyncThunk<PromoFilm, string, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'film/fetchFilmInfo',
  async (id, {extra: api}) => {
    const {data} = await api.get<PromoFilm>(`${APIRoute.Films}/${id}`);
    return data;
  },
);

export const fetchFilmReviews = createAsyncThunk<FilmReview, string, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'film/fetchFilmReview',
  async (id, {extra: api}) => {
    const {data} = await api.get<FilmReview>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const fetchSimilarFilms = createAsyncThunk<SimilarFilm[], string, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'film/fetchSimilarFilms',
  async (id, {extra: api}) => {
    const {data} = await api.get<SimilarFilm[]>(`${APIRoute.Films}/${id}/similar`);
    return data;
  },
);

export const fetchMyList = createAsyncThunk<FilmPreview[], undefined, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'film/getMyList',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<FilmPreview[]>(APIRoute.Favorite);
    return data;
  }
);

export const fetchChangeFilmStatus = createAsyncThunk<PromoFilm, ChangeFilmStatus, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'film/changeFilmStatus',
  async ({id, status}, {extra: api}) => {
    const {data} = await api.post<PromoFilm>(`${APIRoute.Favorite}/${id}/${status}`);
    return data;
  }
);

export const addFilmReview = createAsyncThunk<void, AddReviewFilm, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'film/addFilmReview',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    await api.post(`${APIRoute.Comments}/${id}`, {comment, rating});
    dispatch(redirectToRoute(`/films/${id}`));
  }
);

export const fetchPromoFilm = createAsyncThunk<PromoFilm, undefined, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'film/getPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoFilm>(APIRoute.Promo);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<string, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const data = await api.get<UserInfo>(APIRoute.Login);
    return data.data.avatarUrl;
  }
);

export const loginAction = createAsyncThunk<string, AuthData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const data = await api.post<UserInfo>(APIRoute.Login, {email, password});
    saveToken(data.data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data.data.avatarUrl;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Login);
  },
);
