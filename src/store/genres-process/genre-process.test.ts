import { Genres } from '../../const';
import { changeGenre, genreProcess } from './genre-process';

describe('Genre process slice', () => {
  it('should change genre with "changeGenre action"', () => {
    const initialState = { genre: Genres.All };
    const expectedGenre = Genres.Crime;
    const result = genreProcess.reducer(
      initialState,
      changeGenre(Genres.Crime)
    );
    expect(result.genre).toBe(expectedGenre);
  });
});
