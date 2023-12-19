import { render, screen } from '@testing-library/react';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';
import MyList from './my-list';

describe('MyListPage', () => {
  it('renders correctly', () => {
    const { withStoreComponent } = withStore(withHistory(<MyList />), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});
