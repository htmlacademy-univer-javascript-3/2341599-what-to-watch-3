import { Helmet } from 'react-helmet-async';
import SelectedFilm from '../../components/selected-film/selected-film';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Genres } from '../../const';
import Header from '../../components/header/header';
import { getFilms, getPromoFilm, getPromoFilmLoadStatus } from '../../store/film-process/selectors';
import FilmCatalog from '../../components/film-catalog/film-catalog';
import Spinner from '../../components/spinner/spinner';
import { useEffect } from 'react';
import { fetchPromoFilm } from '../../store/api-actions';
import Footer from '../../components/footer/footer';

export default function Start(): JSX.Element {
  const filmsList = useAppSelector(getFilms);
  const genres = [...new Set(filmsList.map((film) => film.genre))].sort();
  genres.unshift(Genres.All);
  const isPromoFilmLoading = useAppSelector(getPromoFilmLoadStatus);
  const promoFilm = useAppSelector(getPromoFilm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPromoFilm());
  }, [dispatch]);

  if (isPromoFilmLoading || !promoFilm){
    return <Spinner/>;
  }

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img data-testid={`${promoFilm.backgroundImage}`} src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header/>
        {<SelectedFilm isFavorite={promoFilm.isFavorite} name={promoFilm.name} genre={promoFilm.genre} posterImage={promoFilm.posterImage} released={promoFilm.released} id={promoFilm.id}/>}
      </section>

      <div className="page-content">
        <FilmCatalog/>

        <Footer/>
      </div>
    </>
  );
}
