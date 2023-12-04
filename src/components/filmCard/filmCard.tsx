import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import VideoPlayer from '../videoPlayer/videoPlayer';
import { useState } from 'react';

type FilmCardProps = {
  name: string;
  previewImage: string;
  id: string;
  previewVideo: string;
}

export default function FilmCard({name, previewImage, id, previewVideo} : FilmCardProps) : JSX.Element{
  const [isSelected, setIsSelected] = useState(false);
  return (
    <article onMouseOver={() => {
      setIsSelected(true);
    }}
    onMouseLeave={() => {
      setIsSelected(false);
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
