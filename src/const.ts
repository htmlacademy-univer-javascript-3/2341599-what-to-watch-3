import { SelectedFilmType } from './types/main';

export const TIMEOUT_SHOW_ERROR = 2000;


export const SelectedFilmItem: SelectedFilmType = { // film in header from API
  id: 'aba664c3-bdf3-4fb3-b8f3-42e007864bbf',
  name: 'The Grand Budapest Hotel',
  posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
  backgroundImage: 'img/bg-the-grand-budapest-hotel.jpg',
  backgroundColor: '#ffffff',
  videoLink: 'https://url-to-video/video.jpg',
  description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.',
  rating: 8.9,
  scoresCount: 240,
  director: 'Wes Anderson',
  starring: [
    'Bill Murray',
  ],
  runTime: 99,
  genre: 'Comedy',
  released: 2014,
  isFavorite: false
};

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

export type GenresValues = keyof typeof Genres;
