import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

import Main from '../../pages/main/main';
import SignIn from '../../pages/login/login.tsx';
import MyList from '../../pages/my-list/my-list.tsx';
import Film from '../../pages/film/film.tsx';
import AddReview from '../../pages/review/review.tsx';
import Player from '../../pages/player/player.tsx';
import PageNotFound from '../../pages/page-not-found/page-not-found.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import { HelmetProvider } from 'react-helmet-async';
export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<Main/>}/>
        <Route path={AppRoute.SignIn} element={<SignIn/>}/>
        <Route path={AppRoute.MyList} element={
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Film} element={<Film/>}/>
        <Route path={AppRoute.AddReview} element={<AddReview/>}/>
        <Route path={AppRoute.Player} element={<Player />}/>
        <Route path={'*'} element={<PageNotFound/>}/>
      </Routes>
    </HelmetProvider>
  );
}
