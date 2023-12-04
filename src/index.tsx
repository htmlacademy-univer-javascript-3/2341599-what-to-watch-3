import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { SelectedFilmItem } from './const';
import { CardsFilm } from './mocks/films';
import { videoSrc } from './mocks/video';
import { checkAuthAction, fetchFilmsAction } from './store/apiActions';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <App SelectedFilmItem={SelectedFilmItem} CardsFilm={CardsFilm} video={videoSrc}/>
    </Provider>
  </React.StrictMode>
);
