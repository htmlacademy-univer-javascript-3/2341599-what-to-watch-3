import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { addFilmReview } from '../../store/api-actions';

type AddReviewFormProps = {
  id: string;
}

const RATING_COUNT = 10;

export default function AddReviewForm({ id }: AddReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const ratings = [...Array(RATING_COUNT).keys()].map((_, i) => i + 1).reverse();
  const [reviewContent, setReviewContent] = useState({
    comment: '',
    rating: 1
  });

  function changeRating(e: React.ChangeEvent<HTMLInputElement>): void {
    const newReviewContent = { ...reviewContent };
    newReviewContent.rating = parseInt(e.target.value, 10);
    setReviewContent(newReviewContent);
  }

  function changeText(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const newReviewContent = { ...reviewContent };
    newReviewContent.comment = e.target.value;
    setReviewContent(newReviewContent);
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addFilmReview({
      id,
      comment: reviewContent.comment,
      rating: reviewContent.rating
    }));
  };

  return (
    <div className="add-review">
      <form onSubmit={handleSubmit} action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {ratings.map((rating) => [
              <input
                key={`input-${rating}`}
                onChange={changeRating}
                className="rating__input"
                id={`star-${rating}`}
                type="radio"
                name="rating"
                value={rating}
                data-testid="rating"
              />,
              <label
                key={`label-${rating}`}
                className="rating__label"
                htmlFor={`star-${rating}`}
              >
                Rating {rating}
              </label>
            ])}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" onChange={changeText} name="review-text" value={reviewContent.comment} id="review-text" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}
