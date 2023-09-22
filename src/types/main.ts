export type FilmCardType = {
  id: string;
  name: string;
  genre: string;
  released: number;
  previewImage: string;
};

export type SelectedFilmType = {
  id: string;
  name:string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: Array<string>;
  runTime: number;
  genre: string;
  released: number;
  isFavorite?: boolean;
}
