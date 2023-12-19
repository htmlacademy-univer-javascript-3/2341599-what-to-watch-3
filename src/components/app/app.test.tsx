import { MemoryHistory, createMemoryHistory } from 'history';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';
import App from './app';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { render, screen } from '@testing-library/react';
import { SelectedFilmItem } from '../../mocks/films';
import { internet } from 'faker';

describe('Application routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it ('render MainPage when user navigates to main page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(
      screen.getByTestId(SelectedFilmItem.backgroundImage)
    ).toBeInTheDocument();
  });

  it('renders LoginPage whe user navigates to login page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.SignIn);

    render(withStoreComponent);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders MyListPage when user navigates to mylist', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          avatarUrl: internet.url(),
        },
      })
    );
    mockHistory.push(AppRoute.MyList);

    render(withStoreComponent);

    expect(screen.getByText(/My List/i)).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('renders MoviePage when user navigates to film page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(`/films/${SelectedFilmItem.id}`);

    render(withStoreComponent);

    expect(screen.getByText(SelectedFilmItem.name)).toBeInTheDocument();
    expect(screen.getByText(SelectedFilmItem.genre)).toBeInTheDocument();
    expect(screen.getByText('More like this')).toBeInTheDocument();
  });

  it('renders ReviewPage when user navigates to review page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          avatarUrl: internet.url(),
        },
      })
    );
    mockHistory.push(`/films/${SelectedFilmItem.id}/review`);

    render(withStoreComponent);

    expect(screen.getByAltText(SelectedFilmItem.name)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByText(SelectedFilmItem.name)).toBeInTheDocument();
  });

  it('renders PlayerPage when user navigates to player page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(`/player/${SelectedFilmItem.id}`);

    render(withStoreComponent);

    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByText(SelectedFilmItem.name)).toBeInTheDocument();
  });

  it('renders NotFoundPage when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push('/unknown');

    render(withStoreComponent);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
