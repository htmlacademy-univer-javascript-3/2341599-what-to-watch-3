import { useState } from 'react';

export default function AddReviewForm():JSX.Element{

  const [reviewContent, setReviewContent] = useState({
    text: '',
    rating: 1
  });

  function changeRating(e: React.ChangeEvent<HTMLInputElement>):void{
    const newReviewContent = {...reviewContent};
    newReviewContent.rating = parseInt(e.target.value, 10);
    setReviewContent(newReviewContent);
  }

  function changeText(e: React.ChangeEvent<HTMLTextAreaElement>):void{
    const newReviewContent = {...reviewContent};
    newReviewContent.text = e.target.value;
    setReviewContent(newReviewContent);
  }

  return(
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" onChange={changeRating} id="star-10" type="radio" name="rating" value="10" checked={reviewContent.rating === 10}/>
            <label className="rating__label" htmlFor="star-10">Rating 10</label>

            <input className="rating__input" onChange={changeRating} id="star-9" type="radio" name="rating" value="9" checked={reviewContent.rating === 9}/>
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input className="rating__input" onChange={changeRating} id="star-8" type="radio" name="rating" value="8" checked={reviewContent.rating === 8}/>
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input className="rating__input" onChange={changeRating} id="star-7" type="radio" name="rating" value="7" checked={reviewContent.rating === 7}/>
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input className="rating__input" onChange={changeRating} id="star-6" type="radio" name="rating" value="6" checked={reviewContent.rating === 6}/>
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input className="rating__input" onChange={changeRating} id="star-5" type="radio" name="rating" value="5" checked={reviewContent.rating === 5}/>
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input className="rating__input" onChange={changeRating} id="star-4" type="radio" name="rating" value="4" checked={reviewContent.rating === 4}/>
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" onChange={changeRating} id="star-3" type="radio" name="rating" value="3" checked={reviewContent.rating === 3}/>
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" onChange={changeRating} id="star-2" type="radio" name="rating" value="2" checked={reviewContent.rating === 2}/>
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" onChange={changeRating} id="star-1" type="radio" name="rating" value="1" checked={reviewContent.rating === 1}/>
            <label className="rating__label" htmlFor="star-1">Rating 1</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" onChange={changeText} name="review-text" value={reviewContent.text} id="review-text" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="button">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}
