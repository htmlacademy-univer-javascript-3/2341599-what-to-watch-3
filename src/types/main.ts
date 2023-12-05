export type FilmCard = {
  id: string;
  name: string;
  genre: string;
  previewImage: string;
  previewVideoLink: string;
};

export type PromoFilm = {
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

export type ChangeFilmStatus = {
  id: string;
  status: number;
}
