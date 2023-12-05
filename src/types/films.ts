export type AddReviewFilm = {
  id: string;
  rating: number;
  comment: string;
};

export type SeeReviewFilm = {
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
}[]
