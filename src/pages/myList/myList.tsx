import { Helmet } from 'react-helmet-async';
import FilmList from '../../components/filmsList/filmList';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMyList, getMyListLoadStatus } from '../../store/filmProcess/selectors';
import { useEffect } from 'react';
import { fetchMyList } from '../../store/apiActions';
import Spinner from '../../components/spinner/spinner';
import Footer from '../../components/footer/footer';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { getAuthorAvatar } from '../../store/userProcess/selectors';

export default function MyList(): JSX.Element{
  const filmList = useAppSelector(getMyList);
  const listLoadingStatus = useAppSelector(getMyListLoadStatus);
  const authorAvatar = useAppSelector(getAuthorAvatar);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(fetchMyList());
  }, [dispatch]);

  if (listLoadingStatus){
    return <Spinner/>;
  }

  return (
    <>
      <Helmet>
        <title>MyList</title>
      </Helmet>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{filmList.length}</span></h1>
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src={authorAvatar ? authorAvatar : ''} alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <FilmList filmsSection={filmList.length} filmsList={filmList}/>
        </section>

        <Footer/>
      </div>
    </>
  );
}
