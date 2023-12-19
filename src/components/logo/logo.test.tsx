import { render, screen } from '@testing-library/react';
import { withHistory } from '../../services/mocks';
import Logo from './logo';

describe('Logo', () => {
  it('renders correctly', () => {
    render(withHistory(<Logo />));

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
