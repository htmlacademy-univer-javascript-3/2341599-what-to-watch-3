import { useState } from 'react';
import { FilmCardType } from '../../types/main';
import FilmCard from '../filmCard/filmCard';

type FilmListProps = {
  filmsList: Array<FilmCardType>;
}

export default function FilmList({filmsList}:FilmListProps): JSX.Element {

  const [selectedFilm, setSelectedFilm] = useState('');

  const changeSelectedFilm = (id:string):void=>{
    setSelectedFilm(id);
  };

  return (
    <div className="catalog__films-list">
      {filmsList.map((el)=>(<FilmCard key={el.id} id={el.id} isSelected={el.id === selectedFilm} name={el.name} previewImage={el.previewImage} changeSelectedFilm={changeSelectedFilm}/>))}
    </div>
  );
}
