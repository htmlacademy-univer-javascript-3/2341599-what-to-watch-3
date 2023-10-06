import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const.ts';

import Main from '../../pages/main/main';
import { FilmCardType, SelectedFilmType } from '../../types/main.ts';
import SignIn from '../../pages/login/login.tsx';
import MyList from '../../pages/myList/myList.tsx';
import Film from '../../pages/films/[id].tsx';
import AddReview from '../../pages/films/[id]/addReview.tsx';
import Player from '../../pages/player/[id].tsx';
import PageNotFound from '../../pages/pageNotFound/pageNotFound.tsx';
import PrivateRoute from '../privateRoute/privateRoute.tsx';
import { HelmetProvider } from 'react-helmet-async';

type AppProps = {
  CardsFilm: Array<FilmCardType>;
  SelectedFilmItem: SelectedFilmType;
}

export default function App({CardsFilm, SelectedFilmItem} : AppProps) : JSX.Element{
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Main SelectedFilmItem={SelectedFilmItem} CardsFilm={CardsFilm}/>}/>
          <Route path={AppRoute.SignIn} element={<SignIn/>}/>
          <Route path={AppRoute.MyList} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyList/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Film} element={<Film/>}/>
          <Route path={AppRoute.AddReview} element={<AddReview/>}/>
          <Route path={AppRoute.Player} element={<Player/>}/>
          <Route path={AppRoute.PageNotFound} element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
