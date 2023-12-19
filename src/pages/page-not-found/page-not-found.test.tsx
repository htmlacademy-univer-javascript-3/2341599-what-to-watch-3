import { render, screen } from '@testing-library/react';
import { withHistory } from '../../services/mocks';
import PageNotFound from './page-not-found';

describe('NotFoundPage', () => {
  it('renders correctly', () => {
    render(withHistory(<PageNotFound />));

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
