import { Routes, Route } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const.ts';

import Main from '../../pages/main/main';
import SignIn from '../../pages/login/login.tsx';
import MyList from '../../pages/myList/myList.tsx';
import Film from '../../pages/films/[id].tsx';
import AddReview from '../../pages/films/[id]/addReview.tsx';
import Player from '../../pages/player/[id].tsx';
import PageNotFound from '../../pages/pageNotFound/pageNotFound.tsx';
import PrivateRoute from '../privateRoute/privateRoute.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../hooks/index.ts';
import Spinner from '../spinner/spinner.tsx';
import HistoryRouter from '../historyRouter/historyRouter.tsx';
import { browserHistory } from '../../browserHistory.ts';
import { getAuthorizationStatus } from '../../store/userProcess/selectors.ts';

export default function App() : JSX.Element{
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  if (authorizationStatus === AuthorizationStatus.Unknown){
    return <Spinner/>;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<Main/>}/>
          <Route path={AppRoute.SignIn} element={<SignIn/>}/>
          <Route path={AppRoute.MyList} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyList />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Film} element={<Film/>}/>
          <Route path={AppRoute.AddReview} element={<AddReview/>}/>
          <Route path={AppRoute.Player} element={<Player />}/>
          <Route path={'*'} element={<PageNotFound/>}/>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
