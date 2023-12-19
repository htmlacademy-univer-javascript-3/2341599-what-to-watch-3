import { internet } from 'faker';
import { AuthorizationStatus } from '../../const';
import { userProcess } from './user-process';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

describe('User process slice', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    avatarUrl: '',
  };

  describe('checkAuthAction', () => {
    it('should change authorizationStatus and avatarUrl with pending action', () => {
      const expectedUrl = internet.url();
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        avatarUrl: expectedUrl,
      };
      const result = userProcess.reducer(
        initialState,
        checkAuthAction.fulfilled(expectedUrl, '', undefined)
      );
      expect(result).toEqual(expectedState);
    });

    it('should return NoAuth with rejected action', () => {
      const result = userProcess.reducer(initialState, checkAuthAction.rejected);
      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    });
  });

  describe('loginAction', () => {
    it('should change authorizationStatus and avatarUrl with pending action', () => {
      const expectedUrl = internet.url();
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        avatarUrl: expectedUrl,
      };
      const result = userProcess.reducer(
        initialState,
        loginAction.fulfilled(expectedUrl, '', { login: '', password: '' })
      );
      expect(result).toEqual(expectedState);
    });
  });

  describe('logoutAction', () => {
    it('should return NoAuth with fulfilled action', () => {
      const result = userProcess.reducer(initialState, logoutAction.fulfilled);
      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    });
  });
});
