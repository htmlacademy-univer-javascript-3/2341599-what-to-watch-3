import { render, screen } from '@testing-library/react';
import HistoryRouter from './history-router';
import { createMemoryHistory } from 'history';

describe('HistoryRouter', () => {
  it('renders correctly', () => {
    const mockHistory = createMemoryHistory();
    const expectedText = 'expected text';
    render(
      <HistoryRouter history={mockHistory}>
        <span>{expectedText}</span>
      </HistoryRouter>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
