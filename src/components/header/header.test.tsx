import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../const';
import { extractActionTypes, makeFakeStore, withHistory, withStore } from '../../services/mocks';
import Header from './header';
import { logoutAction } from '../../store/api-actions';
import { createMemoryHistory } from 'history';

describe('UserBlock', () => {
  it('renders avatar when authorized', () => {
    const { withStoreComponent } = withStore(withHistory(<Header />), {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        avatarUrl: '',
      },
    });

    render(withStoreComponent);

    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('logs out when sign out is clicked', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistory(<Header />),
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          avatarUrl: '',
        },
      }
    );

    render(withStoreComponent);
    mockAxiosAdapter.onDelete(APIRoute.Login).reply(200);
    await userEvent.click(screen.getByTestId('logOut'));
    const actions = extractActionTypes(mockStore.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);
  });

  it('renders sign in link when unauthorized', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      withHistory(<Header />, mockHistory),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
