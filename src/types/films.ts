export type AddReviewFilmType = {
  id: string;
  rating: number;
  comment: string;
};

export type SeeReviewFilmType = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
}

export type SimilarFilm = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
}

export type FilmReview = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
}
