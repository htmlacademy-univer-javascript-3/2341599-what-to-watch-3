import { Genres, NameSpace } from '../../const';
import { getGenre } from './selectors';

describe('Genre process selectors', () => {
  const state = {
    [NameSpace.Genre]: { genre: Genres.All },
  };

  it('returns genre from state', () => {
    const { genre } = state[NameSpace.Genre];
    const result = getGenre(state);
    expect(result).toBe(genre);
  });
});
