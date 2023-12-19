import { FilmPreview } from '../../types/main';
import FilmCard from '../film-card/film-card';


type FilmListProps = {
  filmsList: FilmPreview[];
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
