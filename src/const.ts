import { SelectedFilmType } from './types/main';
import { FilmCardType } from './types/main';


export const CardsFilm: Array<FilmCardType> = [
  {
    id: '1',
    name: 'Fantastic Beasts: The Crimes of Grindelwald',
    genre: '',
    released: 0,
    previewImage: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'
  },
  {
    id: '2',
    name: 'Bohemian Rhapsody',
    genre: '',
    released: 0,
    previewImage: 'img/bohemian-rhapsody.jpg'
  },
  {
    id: '3',
    name: 'Macbeth',
    genre: '',
    released: 0,
    previewImage: 'img/macbeth.jpg'
  },
  {
    id: '4',
    name: 'Aviator',
    genre: '',
    released: 0,
    previewImage: 'img/aviator.jpg'
  },
  {
    id: '5',
    name: 'We need to talk about Kevin',
    genre: '',
    released: 0,
    previewImage: 'img/we-need-to-talk-about-kevin.jpg'
  },
  {
    id: '20',
    name: 'What We Do in the Shadows',
    genre: '',
    released: 0,
    previewImage: 'img/what-we-do-in-the-shadows.jpg'
  },
  {
    id: '6',
    name: 'Revenant',
    genre: '',
    released: 0,
    previewImage: 'img/revenant.jpg'
  },
  {
    id: '7',
    name: 'Johnny English',
    genre: '',
    released: 0,
    previewImage: 'img/johnny-english.jpg'
  },
  {
    id: '8',
    name: 'Shutter Island',
    genre: '',
    released: 0,
    previewImage: 'img/shutter-island.jpg'
  },
  {
    id: '9',
    name: 'Pulp Fiction',
    genre: '',
    released: 0,
    previewImage: 'img/pulp-fiction.jpg'
  },
  {
    id: '10',
    name: 'No Country for Old Men',
    genre: '',
    released: 0,
    previewImage: 'img/no-country-for-old-men.jpg'
  },
  {
    id: '19',
    name: 'Snatch',
    genre: '',
    released: 0,
    previewImage: 'img/snatch.jpg'
  },
  {
    id: '11',
    name: 'Moonrise Kingdom',
    genre: '',
    released: 0,
    previewImage: 'img/moonrise-kingdom.jpg'
  },
  {
    id: '12',
    name: 'Seven Years in Tibet',
    genre: '',
    released: 0,
    previewImage: 'img/seven-years-in-tibet.jpg'
  },
  {
    id: '13',
    name: 'Midnight Special',
    genre: '',
    released: 0,
    previewImage: 'img/midnight-special.jpg'
  },
  {
    id: '14',
    name: 'War of the Worlds',
    genre: '',
    released: 0,
    previewImage: 'img/war-of-the-worlds.jpg'
  },
  {
    id: '15',
    name: 'Dardjeeling Limited',
    genre: '',
    released: 0,
    previewImage: 'img/dardjeeling-limited.jpg'
  },
  {
    id: '16',
    name: 'Orlando',
    genre: '',
    released: 0,
    previewImage: 'img/orlando.jpg'
  },
  {
    id: '17',
    name: 'Mindhunter',
    genre: '',
    released: 0,
    previewImage: 'img/mindhunter.jpg'
  },
  {
    id: '18',
    name: 'Midnight Special',
    genre: '',
    released: 0,
    previewImage: 'img/midnight-special.jpg'
  },
];

export const catalogList = [ // этот список пока не использую, думаю его надо будет генерировать при получении списка фильмов
  {
    name: 'All genres',
    isActive: true
  },
  {
    name: 'Comedies',
    isActive: false
  },
  {
    name: 'Crime',
    isActive: false
  },
  {
    name: 'Documentary',
    isActive: false
  },
  {
    name: 'Dramas',
    isActive: false
  },
  {
    name: 'Horror',
    isActive: false
  },
  {
    name: 'Kids & Family',
    isActive: false
  },
  {
    name: 'Romance',
    isActive: false
  },
  {
    name: 'Sci-Fi',
    isActive: false
  },
  {
    name: 'Thrillers',
    isActive: false
  }
];

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
    'Bill Murray'
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
  PageNotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

