import { makeFakeStoreFilms } from '../../services/mocks';
import { NameSpace } from '../../const';
import { getFilmInfo, getFilmInfoLoadStatus, getFilmLoadStatus, getFilms, getMyList, getMyListLoadStatus, getPromoFilm, getPromoFilmLoadStatus, getSimilarFilms, getSimilarFilmsLoadStatus } from './selectors';

describe('film process selectors', () => {
  const state = {
    [NameSpace.Film]: makeFakeStoreFilms()
  };

  it('should get film list from state', () => {
    const { films } = state[NameSpace.Film];
    const result = getFilms(state);
    expect(result).toEqual(films);
  });

  it('should get film info from state', () => {
    const { filmInfo } = state[NameSpace.Film];
    const result = getFilmInfo(state);
    expect(result).toEqual(filmInfo);
  });

  it('should get similar films from state', () => {
    const { similarFilms } = state[NameSpace.Film];
    const result = getSimilarFilms(state);
    expect(result).toEqual(similarFilms);
  });

  it('should get film loading status from state', () => {
    const { isFilmsDataLoading } = state[NameSpace.Film];
    const result = getFilmLoadStatus(state);
    expect(result).toEqual(isFilmsDataLoading);
  });

  it('should get film info loading status from state', () => {
    const { isFilmInfoLoading } = state[NameSpace.Film];
    const result = getFilmInfoLoadStatus(state);
    expect(result).toEqual(isFilmInfoLoading);
  });

  it('should get similar films loading status from state', () => {
    const { isSimilarFilmsLoading } = state[NameSpace.Film];
    const result = getSimilarFilmsLoadStatus(state);
    expect(result).toEqual(isSimilarFilmsLoading);
  });

  it('should get promoFilm loading status from state', () => {
    const { isPromoFilmLoading } = state[NameSpace.Film];
    const result = getPromoFilmLoadStatus(state);
    expect(result).toEqual(isPromoFilmLoading);
  });

  it('should get promoFilm from state', () => {
    const { promoFilm } = state[NameSpace.Film];
    const result = getPromoFilm(state);
    expect(result).toEqual(promoFilm);
  });

  it('should get my list loading status from state', () => {
    const { isMyListLoading } = state[NameSpace.Film];
    const result = getMyListLoadStatus(state);
    expect(result).toEqual(isMyListLoading);
  });

  it('should get my list from state', () => {
    const { myList } = state[NameSpace.Film];
    const result = getMyList(state);
    expect(result).toEqual(myList);
  });
});
