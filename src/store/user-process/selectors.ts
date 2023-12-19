import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: Pick<State, typeof NameSpace.User>) =>
  state[NameSpace.User].authorizationStatus;

export const getAuthorAvatar = (state: Pick<State, typeof NameSpace.User>) =>
  state[NameSpace.User].avatarUrl;
