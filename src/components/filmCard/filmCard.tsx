import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import VideoPlayer from '../videoPlayer/videoPlayer';

type FilmCardProps = {
  name: string;
  previewImage: string;
  id: string;
  changeSelectedFilm: (id: string)=> void;
  isSelected: boolean;
  previewVideo: string;
}

export default function FilmCard({name, previewImage, id, changeSelectedFilm, isSelected, previewVideo} : FilmCardProps) : JSX.Element{
  return (
    <article onMouseOver={() => {
      changeSelectedFilm(id);
    }}
    onMouseLeave={() => {
      changeSelectedFilm('');
    }} className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        <VideoPlayer videoSrc={previewVideo} isActive={isSelected} poster={previewImage}/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={generatePath(AppRoute.Film, {id: id})}>{name}</Link>
      </h3>
    </article>
  );
}
