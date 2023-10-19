import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { SelectedFilmItem } from './const';
import { CardsFilm } from './mocks/films';
import { videoSrc } from './mocks/video';
import { AddReviewFilm } from './mocks/addReviewFilm';
import { SeeReviewFilm } from './mocks/seeReviewFilm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App SelectedFilmItem={SelectedFilmItem} CardsFilm={CardsFilm} video={videoSrc} reviewFilm={AddReviewFilm} selectedFilm={SelectedFilmItem} seeReviewsFilm={SeeReviewFilm}/>
  </React.StrictMode>
);
