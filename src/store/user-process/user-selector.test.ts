import { NameSpace } from '../../const';
import { makeFakeStoreUser } from '../../services/mocks';
import { getAuthorAvatar, getAuthorizationStatus } from './selectors';

describe('User process selectors', () => {
  const state = {
    [NameSpace.User]: makeFakeStoreUser()
  };

  it('should return getAuthorizationStatus from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return authorAvatar from state', () => {
    const { avatarUrl } = state[NameSpace.User];
    const result = getAuthorAvatar(state);
    expect(result).toBe(avatarUrl);
  });
});
