type FilmOverviewType = {
  rating: number;
  scoresCount: number;
  description: string;
  director: string;
  starringList: string;
}

export default function FilmOverview({rating, scoresCount, description, director, starringList}:FilmOverviewType):JSX.Element{
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{`${scoresCount} ratings`}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>{`Director: ${director}`}</strong></p>

        <p className="film-card__starring"><strong>{`Starring: ${starringList}`}</strong></p>
      </div>
    </>
  );
}
