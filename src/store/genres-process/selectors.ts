import { NameSpace } from './../../const';
import { State } from '../../types/state';

export const getGenre = (state: Pick<State, typeof NameSpace.Genre>): string => state[NameSpace.Genre].genre;
