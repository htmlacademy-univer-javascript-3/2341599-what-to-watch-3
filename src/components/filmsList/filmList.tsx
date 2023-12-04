import { FilmCardType } from '../../types/main';
import FilmCard from '../filmCard/filmCard';

type FilmListProps = {
  filmsList: Array<FilmCardType>;
  filmsSection: number;
}

export default function FilmList({filmsList, filmsSection}:FilmListProps): JSX.Element {

  const newFilmsList = filmsList.slice(0, filmsSection);

  return (
    <div className="catalog__films-list">
      {newFilmsList.map((el)=>(<FilmCard key={el.id} id={el.id} name={el.name} previewVideo={el.previewVideoLink} previewImage={el.previewImage} />))}
    </div>
  );
}
