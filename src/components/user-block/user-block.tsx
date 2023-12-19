import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getAuthorAvatar,
  getAuthorizationStatus,
} from '../../store/user-process/selectors';
import { logoutAction } from '../../store/api-actions';

export default function UserBlock() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const avatarUrl = useAppSelector(getAuthorAvatar);

  function getAuthBlock() {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      return (
        <>
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img
                src={avatarUrl ? avatarUrl : ''}
                alt="User avatar"
                width="63"
                height="63"
                onClick={() => navigate(AppRoute.MyList)}
              />
            </div>
          </li>
          <li
            className="user-block__item"
            onClick={() => {
              dispatch(logoutAction());
            }}
            data-testid="logOut"
          >
            <a className="user-block__link">Sign out</a>
          </li>
        </>
      );
    } else if (authorizationStatus === AuthorizationStatus.NoAuth) {
      return (
        <Link to={AppRoute.SignIn} className="user-block__link">
          Sign in
        </Link>
      );
    }
  }

  return <ul className="user-block">{getAuthBlock()}</ul>;
}
