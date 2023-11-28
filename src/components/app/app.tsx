import { Routes, Route } from 'react-router-dom';

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
import { AddReviewFilmType, SeeReviewFilmType } from '../../types/films.ts';
import { useAppSelector } from '../../hooks/index.ts';
import Spinner from '../spinner/spinner.tsx';
import HistoryRouter from '../historyRouter/historyRouter.tsx';
import { browserHistory } from '../../browserHistory.ts';

type AppProps = {
  CardsFilm: Array<FilmCardType>;
  SelectedFilmItem: SelectedFilmType;
  video: string;
  reviewFilm: AddReviewFilmType;
  selectedFilm: SelectedFilmType;
  seeReviewsFilm: Array<SeeReviewFilmType>;
}

export default function App({CardsFilm, SelectedFilmItem, video, reviewFilm, selectedFilm, seeReviewsFilm} : AppProps) : JSX.Element{
  const authorizationStatus = useAppSelector((state)=>state.AuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown){
    return <Spinner/>;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<Main SelectedFilmItem={SelectedFilmItem}/>}/>
          <Route path={AppRoute.SignIn} element={<SignIn/>}/>
          <Route path={AppRoute.MyList} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyList CardsFilm={CardsFilm}/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Film} element={<Film selectedFilm={selectedFilm} seeReviewsFilm={seeReviewsFilm}/>}/>
          <Route path={AppRoute.AddReview} element={<AddReview reviewFilm={reviewFilm} />}/>
          <Route path={AppRoute.Player} element={<Player video={video}/>}/>
          <Route path={'*'} element={<PageNotFound/>}/>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
