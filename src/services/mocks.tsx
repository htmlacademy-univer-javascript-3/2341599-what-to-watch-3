import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createAPI } from './api';
import { MemoryHistory, createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../components/history-router/history-router';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AuthorizationStatus, Genres, NameSpace } from '../const';
import { SelectedFilmItem } from '../mocks/selected-film';
import { internet } from 'faker';
import { ReactElement, ReactNode } from 'react';
import { CardsFilm } from '../mocks/films';
import { SeeRevFilm } from '../mocks/see-review-film';


export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export const extractActionTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export function withHistory(component: ReactNode, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>{component}</HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: ReactElement,
  initialState: Partial<State> = {}
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [NameSpace.Film]: {
    films: CardsFilm,
    filmInfo: SelectedFilmItem,
    promoFilm: SelectedFilmItem,
    similarFilms: CardsFilm,
    myList: CardsFilm,
    isFilmsDataLoading: false,
    isFilmInfoLoading: false,
    isMyListLoading: false,
    isPromoFilmLoading: false,
    isSimilarFilmsLoading: false
  },
  [NameSpace.Genre]: { genre: Genres.All},
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    avatarUrl: internet.url()
  },
  [NameSpace.Review]: {
    filmReviews: SeeRevFilm,
    isFilmReviewsLoading: false
  },
  ...(initialState ?? {})
});

export const makeFakeStoreFilms = () => makeFakeStore().FILM;

export const makeFakeStoreReview = () => makeFakeStore().REVIEW;

export const makeFakeStoreUser = () => makeFakeStore().USER;
