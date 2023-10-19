import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type FilmCardProps = {
  name: string;
  previewImage: string;
  id: string;
  changeSelectedFilm: (id: string)=> void;
}

export default function FilmCard({name, previewImage, id, changeSelectedFilm} : FilmCardProps) : JSX.Element{
  return (
    <article onMouseOver={() => {
      changeSelectedFilm(id);
    }} className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film}>{name}</Link>
      </h3>
    </article>
  );
}
