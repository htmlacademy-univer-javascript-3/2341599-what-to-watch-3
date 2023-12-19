import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../services/mocks';

describe('Footer', () => {
  it('renders correctly', () => {
    render(withHistory(<Footer />));

    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
