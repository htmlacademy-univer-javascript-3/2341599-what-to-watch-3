import { PromoFilm } from '../../types/main';

type FilmOverviewType = {
  film: PromoFilm;
}

export default function FilmOverview({film}:FilmOverviewType):JSX.Element{

  const getTextRating = ()=>{
    if (film.rating < 3){
      return 'Bad';
    } else if (film.rating < 5){
      return 'Normal';
    } else if (film.rating < 8){
      return 'Good';
    } else if (film.rating < 10){
      return 'Very Good';
    }
    return 'Awesome';
  };

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getTextRating()}</span>
          <span className="film-rating__count">{`${film.scoresCount} ratings`}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>{`Director: ${film.director}`}</strong></p>

        <p className="film-card__starring"><strong>{`Starring: ${film.starring.join(', ')}`}</strong></p>
      </div>
    </>
  );
}
