type FilmCardProps = {
  text: string;
}

export default function FilmCardLink({text} : FilmCardProps) : JSX.Element{
  return (
    <li className='catalog__genres-item'>
      <a href="#" className="catalog__genres-link">{text}</a>
    </li>
  );
}
