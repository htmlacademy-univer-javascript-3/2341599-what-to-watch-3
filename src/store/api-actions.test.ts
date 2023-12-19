import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, extractActionTypes } from '../services/mocks';
import { APIRoute, NameSpace } from '../const';
import { CardsFilm } from '../mocks/films';
import { addFilmReview, checkAuthAction, fetchChangeFilmStatus, fetchFilmInfoAction, fetchFilmReviews, fetchFilmsAction, fetchMyList, fetchPromoFilm, fetchSimilarFilms, loginAction, logoutAction } from './api-actions';
import { internet } from 'faker';
import * as tokenStorage from '../services/token';
import { redirectToRoute } from './action';
import { SelectedFilmItem } from '../mocks/selected-film';
import { SeeRevFilm } from '../mocks/see-review-film';

describe('Api actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Film]: {
        films: [],
        filmInfo: null,
        promoFilm: null,
        similarFilms: [],
        myList: [],
        isFilmsDataLoading: false,
        isFilmInfoLoading: false,
        isMyListLoading: false,
        isPromoFilmLoading: false,
        isSimilarFilmsLoading: false
      },
      [NameSpace.User]: {avatarUrl: null},
      [NameSpace.Review]: {filmReviews: []}
    });
  });

  describe('fetchFilmsAction action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(200, CardsFilm);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchFilmsFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmsAction.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);
      expect(fetchFilmsFulfilled.payload).toEqual(CardsFilm);
    });
  });

  describe('fetchFilmInfo action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}`).reply(200, SelectedFilmItem);

      await store.dispatch(fetchFilmInfoAction(id));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchFilmInfoActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmInfoAction.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchFilmInfoAction.pending.type,
        fetchFilmInfoAction.fulfilled.type,
      ]);
      expect(fetchFilmInfoActionFulfilled.payload).toEqual(SelectedFilmItem);
    });
  });

  describe('fetchFilmReview action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${id}`)
        .reply(200, SeeRevFilm);

      await store.dispatch(fetchFilmReviews(id));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchFilmReviewsFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmReviews.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchFilmReviews.pending.type,
        fetchFilmReviews.fulfilled.type,
      ]);
      expect(fetchFilmReviewsFulfilled.payload).toEqual(SeeRevFilm);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(404);

      await store.dispatch(fetchFilmReviews(id));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmReviews.pending.type,
        fetchFilmReviews.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarFilms action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter
        .onGet(`${APIRoute.Films}/${id}/similar`)
        .reply(200, CardsFilm);

      await store.dispatch(fetchSimilarFilms(id));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchSimilarFilmsFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchSimilarFilms.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchSimilarFilms.pending.type,
        fetchSimilarFilms.fulfilled.type,
      ]);
      expect(fetchSimilarFilmsFulfilled.payload).toEqual(CardsFilm);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}/similar`).reply(404);

      await store.dispatch(fetchSimilarFilms(id));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarFilms.pending.type,
        fetchSimilarFilms.rejected.type,
      ]);
    });
  });

  describe('fetchMyList action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, CardsFilm);

      await store.dispatch(fetchMyList());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchMyListFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchMyList.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchMyList.pending.type,
        fetchMyList.fulfilled.type,
      ]);
      expect(fetchMyListFulfilled.payload).toEqual(CardsFilm);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(401);

      await store.dispatch(fetchMyList());

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchMyList.pending.type,
        fetchMyList.rejected.type,
      ]);
    });
  });

  describe('fetchChangeFilmStatus action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      const id = crypto.randomUUID();
      const favoriteStatus = {
        id: id,
        status: 0
      };
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${favoriteStatus.status}`).reply(200, SelectedFilmItem);

      await store.dispatch(fetchChangeFilmStatus(favoriteStatus));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchChangeFilmStatusFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchChangeFilmStatus.fulfilled
      >;
      expect(extractedActionTypes).toEqual([
        fetchChangeFilmStatus.pending.type,
        fetchChangeFilmStatus.fulfilled.type,
      ]);
      expect(fetchChangeFilmStatusFulfilled.payload).toEqual(SelectedFilmItem);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      const id = crypto.randomUUID();
      const favoriteStatus = {
        id: id,
        status: 0
      };
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${favoriteStatus.status}`).reply(400);

      await store.dispatch(fetchChangeFilmStatus(favoriteStatus));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchChangeFilmStatus.pending.type,
        fetchChangeFilmStatus.rejected.type,
      ]);
    });
  });

  describe('addFilmReview action', () => {
    it('dispatches pending, fulfilled and redirectToRoute when server responds with success', async () => {
      const id = crypto.randomUUID();
      const review = { id: id, comment: '', rating: 0 };
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${id}`).reply(200, SelectedFilmItem);

      await store.dispatch(addFilmReview(review));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        addFilmReview.pending.type,
        redirectToRoute.type,
        addFilmReview.fulfilled.type,
      ]);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      const id = crypto.randomUUID();
      const review = { id: id, comment: '', rating: 0 };

      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${id}`).reply(400);

      await store.dispatch(addFilmReview(review));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        addFilmReview.pending.type,
        addFilmReview.rejected.type,
      ]);
    });
  });

  describe('fetchPromoFilm action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, SelectedFilmItem);

      await store.dispatch(fetchPromoFilm());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchPromoFilmFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchPromoFilm.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        fetchPromoFilm.pending.type,
        fetchPromoFilm.fulfilled.type,
      ]);
      expect(fetchPromoFilmFulfilled.payload).toEqual(SelectedFilmItem);
    });
  });

  describe('checkAuth action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      const expectedUrl = internet.url();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, { avatarUrl: expectedUrl });

      await store.dispatch(checkAuthAction());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const checkAuthFulfilled = emittedActions.at(1) as ReturnType<
        typeof checkAuthAction.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
      expect(checkAuthFulfilled.payload).toBe(expectedUrl);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

      await store.dispatch(checkAuthAction());

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('login action', () => {
    it('dispatches pending, fulfilled and redirectToRoute when server responds with success', async () => {
      const userData = { login: '', password: '' };
      const avatarUrl = internet.url();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, { token: '', avatarUrl: avatarUrl });
      const mockSaveToken = vi.spyOn(tokenStorage, 'getToken');

      await store.dispatch(loginAction(userData));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const loginFulfilled = emittedActions.at(2) as ReturnType<
        typeof loginAction.fulfilled
      >;

      expect(extractedActionTypes).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
      expect(loginFulfilled.payload).toBe(avatarUrl);
      expect(mockSaveToken).toBeCalledTimes(1);
    });

    it('dispatches pending, rejected when server responds with failure', async () => {
      const userData = { login: '', password: '' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction(userData));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([loginAction.pending.type, loginAction.rejected.type]);
    });
  });

  describe('logout action', () => {
    it('dispatches pending, fulfilled when server responds with success', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Login).reply(204);

      await store.dispatch(logoutAction());

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([logoutAction.pending.type, logoutAction.fulfilled.type]);
    });
  });
});
