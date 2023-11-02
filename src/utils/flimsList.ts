import { FilmCardType } from '../types/main';

export function getFlimsOfGenre(filmList:Array<FilmCardType>, genre:string): Array<FilmCardType>{
  if (genre === 'All'){
    return filmList;
  }
  const result: Array<FilmCardType> = [];
  filmList.forEach((element)=>{
    if (element.genre === genre){
      result.push(element);
    }
  });
  return result;
}
