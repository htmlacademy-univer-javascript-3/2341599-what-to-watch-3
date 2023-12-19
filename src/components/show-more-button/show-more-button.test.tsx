import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowMoreButton from './show-more-button';

describe('ShowMoreButton', () => {
  const onClick = vi.fn();
  const preparedComponent = <ShowMoreButton isDisplay onClick={onClick} />;

  it('renders when active', () => {
    render(preparedComponent);

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('shows more on click', async () => {
    render(preparedComponent);
    await userEvent.click(screen.getByTestId('showMore'));

    expect(onClick).toBeCalledTimes(1);
  });
});
