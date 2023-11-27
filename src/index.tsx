import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { SelectedFilmItem } from './const';
import { CardsFilm } from './mocks/films';
import { videoSrc } from './mocks/video';
import { AddReviewFilm } from './mocks/addReviewFilm';
import { SeeReviewFilm } from './mocks/seeReviewFilm';
import ErrorMessage from './components/errorMessage/errorMessage';
import { checkAuthAction, fetchFilmsAction } from './store/apiActions';

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage/>
      <App SelectedFilmItem={SelectedFilmItem} CardsFilm={CardsFilm} video={videoSrc} reviewFilm={AddReviewFilm} selectedFilm={SelectedFilmItem} seeReviewsFilm={SeeReviewFilm}/>
    </Provider>
  </React.StrictMode>
);
