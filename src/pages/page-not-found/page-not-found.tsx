import { Helmet } from 'react-helmet-async';
import {Link} from 'react-router-dom';

export default function PageNotFound(): JSX.Element{
  return (
    <>
      <Helmet>
        <title>PageNotFound</title>
      </Helmet>
      <h1>
        404.
        <br />
        <small>Page not found</small>
      </h1>
      <Link to="/">Go to main page</Link>
    </>
  );
}
