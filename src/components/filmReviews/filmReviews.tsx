import { SeeReviewFilm } from '../../types/films';

type FilmReviewsProps = {
  seeReviewsFilm: Array<SeeReviewFilm>;
}

export default function FilmReviews({ seeReviewsFilm }: FilmReviewsProps): JSX.Element {
  const getValidArray = (array: Array<SeeReviewFilm>) => array.reduce((acc: Array<Array<SeeReviewFilm>>, curr, index: number): Array<Array<SeeReviewFilm>> => {
    if (index % 3 === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, []);

  const getValidDate = (date: string) =>{
    const validDate = new Date(date);
    return validDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="film-card__reviews film-card__row">
      {getValidArray(seeReviewsFilm).map((el) => (
        <div key={Date.now()} className="film-card__reviews-col">
          {el.map((point) => (
            <div key={point.id} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{point.comment}</p>
                <footer className="review__details">
                  <cite className="review__author">{point.user}</cite>
                  <time className="review__date" dateTime={point.date}>{getValidDate(point.date)}</time>
                </footer>
              </blockquote>
              <div className="review__rating">{point.rating}</div>
            </div>))}
        </div>))}
    </div>
  );
}
