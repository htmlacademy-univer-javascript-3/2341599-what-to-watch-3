import Main from '../../pages/main/main';
import { FilmCardType, SelectedFilmType } from '../../types/main.ts';

type AppProps = {
  CardsFilm: Array<FilmCardType>;
  SelectedFilmItem: SelectedFilmType;
}

export default function App({CardsFilm, SelectedFilmItem} : AppProps) : JSX.Element{
  return (
    <Main SelectedFilmItem={SelectedFilmItem} CardsFilm={CardsFilm}/>
  );
}
