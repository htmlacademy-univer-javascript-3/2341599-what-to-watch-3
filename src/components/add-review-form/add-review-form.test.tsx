import { render, screen } from '@testing-library/react';
import { extractActionTypes, withStore } from '../../services/mocks';
import userEvent from '@testing-library/user-event';
import { APIRoute } from '../../const';
import { redirectToRoute } from '../../store/action';
import AddReviewForm from './add-review-form';
import { addFilmReview } from '../../store/api-actions';

describe('Add review Form', () => {
  const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
    <AddReviewForm id="1" />
  );

  it('renders correctly', () => {
    render(withStoreComponent);

    expect(screen.getAllByTestId('rating')).toHaveLength(10);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('checks rating on click', async () => {
    render(withStoreComponent);
    await userEvent.click(screen.getAllByTestId('rating')[4]);

    expect(screen.getAllByTestId('rating')[4]).toBeChecked();
  });

  it('types text in textarea', async () => {
    const expectedText = 'good movie';

    render(withStoreComponent);
    await userEvent.type(
      screen.getByPlaceholderText('Review text'),
      expectedText
    );

    expect(screen.getByDisplayValue(expectedText)).toBeInTheDocument();
  });

  it('sends review on submit click', async () => {
    render(withStoreComponent);
    mockAxiosAdapter.onPost(`${APIRoute.Comments}/1`).reply(200);
    await userEvent.click(screen.getAllByTestId('rating')[4]);
    await userEvent.type(
      screen.getByPlaceholderText('Review text'),
      'review text with at least 50 symbols to pass length check'
    );
    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionTypes(mockStore.getActions());
    expect(actions).toEqual([
      addFilmReview.pending.type,
      redirectToRoute.type,
      addFilmReview.fulfilled.type,
    ]);
  });
});
