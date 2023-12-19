import { CardsFilm } from '../../mocks/films';
import { SelectedFilmItem } from '../../mocks/selected-film';
import { FilmProcess } from '../../types/state';
import { fetchFilmInfoAction, fetchFilmsAction, fetchMyList, fetchPromoFilm, fetchSimilarFilms } from '../api-actions';
import { filmProcess } from './film-process';

describe('film process slice', () => {
  const initialState: FilmProcess = {
    films: [],
    filmInfo: null,
    promoFilm: null,
    myList: [],
    similarFilms: [],
    isFilmsDataLoading: false,
    isFilmInfoLoading: false,
    isSimilarFilmsLoading: false,
    isPromoFilmLoading: false,
    isMyListLoading: false
  };
  describe('fetchFilmsAction', () => {
    it ('should change isFilmsDataLoading with pending action', () => {
      const expectedState = {...initialState, isFilmsDataLoading: true};
      const result = filmProcess.reducer(
        initialState,
        fetchFilmsAction.pending
      );
      expect(result).toEqual(expectedState);
    });

    it ('should change isFilmsDataLoading with fulfilled action', () => {
      const expectedState = {...initialState, films: CardsFilm, isFilmsDataLoading: false};
      const result = filmProcess.reducer(
        initialState,
        fetchFilmsAction.fulfilled(CardsFilm, '', undefined)
      );
      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchFilmInfoAction', () => {
    it ('should change isFilmInfoLoading with pending action', () => {
      const expectedState = {...initialState, isFilmInfoLoading: true};
      const result = filmProcess.reducer(
        initialState,
        fetchFilmInfoAction.pending
      );
      expect(result).toEqual(expectedState);
    });

    it ('should change isFilmInfoLoading with fulfilled action', () => {
      const expectedState = {...initialState, filmInfo: SelectedFilmItem, isFilmInfoLoading: false};
      const result = filmProcess.reducer(
        initialState,
        fetchFilmInfoAction.fulfilled(SelectedFilmItem, '', '')
      );
      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchPromoFilmAction', () => {
    it ('should change isPromoFilmLoading with pending action', () => {
      const expectedState = {...initialState, isPromoFilmLoading: true};
      const result = filmProcess.reducer(
        initialState,
        fetchPromoFilm.pending
      );
      expect(result).toEqual(expectedState);
    });

    it ('should change isPromoFilmLoading with fulfilled action', () => {
      const expectedState = {...initialState, promoFilm:SelectedFilmItem, isPromoFilmLoading: false};
      const result = filmProcess.reducer(
        initialState,
        fetchPromoFilm.fulfilled(SelectedFilmItem, '', undefined)
      );
      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchMyListAction', () => {
    it('should change isMyListLoading with pending action', () => {
      const expectedState = {...initialState, isMyListLoading: true};
      const result = filmProcess.reducer(
        initialState,
        fetchMyList.pending
      );
      expect(result).toEqual(expectedState);
    });

    it('should change isMyListLoading with fulfilled action', () => {
      const expectedState = {...initialState, myList: CardsFilm, isMyListLoading: false};
      const result = filmProcess.reducer(
        initialState,
        fetchMyList.fulfilled(CardsFilm, '', undefined)
      );
      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchSimilarFilmsAction', () => {
    it('should change isSimilarFilmsLoading with pending action', () => {
      const expectedState = {...initialState, isSimilarFilmsLoading: true};
      const result = filmProcess.reducer(
        initialState,
        fetchSimilarFilms.pending
      );
      expect(result).toEqual(expectedState);
    });

    it('should change isSimilarFilmsLoading with fulfilled action', () => {
      const expectedState = {...initialState, similarFilms: CardsFilm, isMyListLoading: false};
      const result = filmProcess.reducer(
        initialState,
        fetchSimilarFilms.fulfilled(CardsFilm, '', '')
      );
      expect(result).toEqual(expectedState);
    });
  });
});
