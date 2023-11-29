import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/apiActions';

type HeaderProps= {
  authorizationStatus: AuthorizationStatus;
  authorAvatar: string | null;
}

export default function Header({authorizationStatus, authorAvatar}:HeaderProps):JSX.Element {
  const dispatch = useAppDispatch();
  const logOut = ()=>{
    dispatch(logoutAction());
  };

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>
      {authorizationStatus === AuthorizationStatus.Auth ?
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src={authorAvatar ? authorAvatar : ''} alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a onClick={logOut} className="user-block__link">Sign out</a>
          </li>
        </ul>
        :
        <div className="user-block">
          <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
        </div>}
    </header>
  );
}
