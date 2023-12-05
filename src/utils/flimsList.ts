import { FilmCard } from '../types/main';

export function getFlimsOfGenre(filmList:Array<FilmCard>, genre:string): Array<FilmCard>{
  if (genre === 'All'){
    return filmList;
  }
  const result: Array<FilmCard> = [];
  filmList.forEach((element)=>{
    if (element.genre === genre){
      result.push(element);
    }
  });
  return result;
}
