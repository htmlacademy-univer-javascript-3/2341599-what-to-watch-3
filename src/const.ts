export const TIMEOUT_SHOW_ERROR = 2000;

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  PageNotFound = '/pageNotFound'
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Promo = '/promo',
  Favorite = '/favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const Genres = {
  All: 'All',
  Comedy: 'Comedy',
  Crime: 'Crime',
  Documentary: 'Documentary',
  Drama: 'Drama',
  Horror: 'Horror',
  KidsFamily: 'KidsFamily',
  Romance: 'Romance',
  SciFi: 'SciFi',
  Thrillers: 'Thrillers',
};

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  Film = 'FILM',
  Genre = 'GENRE',
  Review = 'REVIEW'
}

export type GenresValues = keyof typeof Genres;
