import { FilmCard, PromoFilm } from '../types/main';

export const CardsFilm: Array<FilmCard> = [
  {
    id: '1',
    name: 'Fantastic Beasts: The Crimes of Grindelwald',
    genre: 'Thriller',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'
  },
  {
    id: '2',
    name: 'Bohemian Rhapsody',
    genre: 'Drama',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/bohemian-rhapsody.jpg'
  },
  {
    id: '3',
    name: 'Macbeth',
    genre: 'Sci-Fi',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/macbeth.jpg'
  },
  {
    id: '4',
    name: 'Aviator',
    genre: 'Crime',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/aviator.jpg'
  },
  {
    id: '5',
    name: 'We need to talk about Kevin',
    genre: 'Comedy',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/we-need-to-talk-about-kevin.jpg'
  },
  {
    id: '20',
    name: 'What We Do in the Shadows',
    genre: 'Romance',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/what-we-do-in-the-shadows.jpg'
  },
  {
    id: '6',
    name: 'Revenant',
    genre: 'Romance',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/revenant.jpg'
  },
  {
    id: '7',
    name: 'Johnny English',
    genre: 'Crime',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/johnny-english.jpg'
  },
  {
    id: '8',
    name: 'Shutter Island',
    genre: 'Drama',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/shutter-island.jpg'
  },
  {
    id: '9',
    name: 'Pulp Fiction',
    genre: 'Kids & Family',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/pulp-fiction.jpg'
  },
  {
    id: '10',
    name: 'No Country for Old Men',
    genre: 'Drama',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/no-country-for-old-men.jpg'
  },
  {
    id: '19',
    name: 'Snatch',
    genre: 'Horror',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/snatch.jpg'
  },
  {
    id: '11',
    name: 'Moonrise Kingdom',
    genre: 'Comedy',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/moonrise-kingdom.jpg'
  },
  {
    id: '12',
    name: 'Seven Years in Tibet',
    genre: 'Thriller',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/seven-years-in-tibet.jpg'
  },
  {
    id: '13',
    name: 'Midnight Special',
    genre: 'Crime',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/midnight-special.jpg'
  },
  {
    id: '14',
    name: 'War of the Worlds',
    genre: 'Kids & Family',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/war-of-the-worlds.jpg'
  },
  {
    id: '15',
    name: 'Dardjeeling Limited',
    genre: 'Comedy',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/dardjeeling-limited.jpg'
  },
  {
    id: '16',
    name: 'Orlando',
    genre: 'Crime',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/orlando.jpg'
  },
  {
    id: '17',
    name: 'Mindhunter',
    genre: 'Thriller',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/mindhunter.jpg'
  },
  {
    id: '18',
    name: 'Midnight Special',
    genre: 'Kids & Family',
    previewVideoLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    previewImage: 'img/midnight-special.jpg'
  },
];

export const SelectedFilmItem: PromoFilm = { // film in header from API
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
