import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import VideoPlayer from '../videoPlayer/videoPlayer';
import { videoSrc } from '../../mocks/video';

type FilmCardProps = {
  name: string;
  previewImage: string;
  id: string;
  changeSelectedFilm: (id: string)=> void;
  isSelected: boolean;
}

export default function FilmCard({name, previewImage, id, changeSelectedFilm, isSelected} : FilmCardProps) : JSX.Element{
  return (
    <article onMouseOver={() => {
      changeSelectedFilm(id);
    }}
    onMouseLeave={() => {
      changeSelectedFilm('');
    }} className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        <VideoPlayer videoSrc={videoSrc} isActive={isSelected} poster={previewImage}/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film}>{name}</Link>
      </h3>
    </article>
  );
}
