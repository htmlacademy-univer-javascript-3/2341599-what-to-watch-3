import { render, screen } from '@testing-library/react';
import {
  extractActionTypes,
  makeFakeStore,
  withHistory,
  withStore,
} from '../../services/mocks';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { APIRoute, AppRoute } from '../../const';
import { loginAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';
import SignIn from './login';

describe('LoginPage', () => {
  const mockHistory = createMemoryHistory();
  const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
    withHistory(<SignIn />),
    makeFakeStore()
  );
  const email = 'test@gmail.com';
  const password = 'password123';
  const wrongEmail = 'wrongEmail';
  const wrongPassword = '123';

  it('renders correctly', () => {
    render(withStoreComponent);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('types in email field', async () => {
    render(withStoreComponent);
    await userEvent.type(screen.getByPlaceholderText('Email address'), email);

    expect(screen.getByDisplayValue(email)).toBeInTheDocument();
  });

  it('types in password field', async () => {
    render(withStoreComponent);
    await userEvent.type(screen.getByPlaceholderText('Password'), password);

    expect(screen.getByDisplayValue(password)).toBeInTheDocument();
  });

  it('displays email error', async () => {
    render(withStoreComponent);
    await userEvent.type(
      screen.getByPlaceholderText('Email address'),
      wrongEmail
    );
    await userEvent.type(screen.getByPlaceholderText('Password'), password);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByDisplayValue(wrongEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();
    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument();
  });

  it('displays password error', async () => {
    render(withStoreComponent);
    await userEvent.type(screen.getByPlaceholderText('Email address'), email);
    await userEvent.type(
      screen.getByPlaceholderText('Password'),
      wrongPassword
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByDisplayValue(email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(wrongPassword)).toBeInTheDocument();
    expect(
      screen.getByText(
        'Password should contain at least one letter and one number'
      )
    ).toBeInTheDocument();
  });

  it('logs in user and redirects to main page', async () => {
    render(withStoreComponent);
    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, { avatarUrl: '' });
    await userEvent.type(screen.getByPlaceholderText('Email address'), email);
    await userEvent.type(screen.getByPlaceholderText('Password'), password);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionTypes(mockStore.getActions());

    expect(mockHistory.location.pathname).toBe(AppRoute.Main);
    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);
  });
});
