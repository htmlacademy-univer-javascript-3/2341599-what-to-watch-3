import { AxiosInstance } from 'axios';
import { AppDispatch, State } from './../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmCardType, SelectedFilmType } from '../types/main';
import { APIRoute, AppRoute, AuthorizationStatus} from '../const';
import { loadAuthorPreview, loadFilmInfo, loadFilms, redirectToRoute, requireAuthorization, setFilmInfoDataLoadingStatus, setFilmReviewData, setFilmSimilarData, setFilmsDataLoadingStatus } from './action';
import { dropToken, saveToken } from '../services/token';
import { AuthData, UserInfo } from '../types/user';
import { AddReviewFilmType, FilmReview, SimilarFilm } from '../types/films';

export const fetchFilmsAction = createAsyncThunk<void, undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data} = await api.get<FilmCardType[]>(APIRoute.Films);
    dispatch(setFilmsDataLoadingStatus(true));
    dispatch(loadFilms(data));
  },
);

export const fetchFilmInfoAction = createAsyncThunk<void, string,{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFilmInfo',
  async (id, {dispatch, extra: api}) => {
    try{
      dispatch(setFilmInfoDataLoadingStatus(true));
      const {data} = await api.get<SelectedFilmType>(`${APIRoute.Films}/${id}`);
      dispatch(loadFilmInfo(data));
      dispatch(setFilmInfoDataLoadingStatus(false));
    } catch{
      dispatch(redirectToRoute(AppRoute.PageNotFound));
    }
  },
);

export const fetchFilmReviews = createAsyncThunk<void, string,{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFilmReview',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmReview[]>(`${APIRoute.Comments}/${id}`);
    dispatch(setFilmReviewData(data));
  },
);

export const fetchSimilarFilms = createAsyncThunk<void, string,{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFilmReview',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<SimilarFilm[]>(`${APIRoute.Films}/${id}/similar`);
    dispatch(setFilmSimilarData(data));
  },
);

export const addFilmReview = createAsyncThunk<void, AddReviewFilmType, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/addFilmReview',
  async ({id, comment, rating}, {extra: api}) => {
    await api.post(`${APIRoute.Comments}/${id}`, {comment, rating});
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const data = await api.get<UserInfo>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(loadAuthorPreview(data.data.avatarUrl));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const data = await api.post<UserInfo>(APIRoute.Login, {email, password});
    dispatch(loadAuthorPreview(data.data.avatarUrl));
    saveToken(data.data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
