import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { FormEvent, useRef, useState } from 'react';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/user';
import Footer from '../../components/footer/footer';

export default function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);


  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const containsAnyLetters = (password: string) => /[a-zA-Z]/.test(password);

  const containsAnyNumbers = (password: string) => /[0-9]/.test(password);

  const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current && passwordRef.current) {
      if (!isValidEmail(loginRef.current.value)) {
        setErrorMessage('Please enter a valid email address');
      } else if (
        !containsAnyLetters(passwordRef.current.value) ||
        !containsAnyNumbers(passwordRef.current.value)
      ) {
        setErrorMessage('Password should contain at least one letter and one number');
      } else {
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>login</title>
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

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form onSubmit={handleSubmit} action="#" className="sign-in__form" noValidate>
            {errorMessage && (
              <div className="sign-in__message">
                <p>{errorMessage}</p>
              </div>
            )}
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" required/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" required/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer/>
      </div>
    </>
  );
}
