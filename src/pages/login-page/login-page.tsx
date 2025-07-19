import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus, CITIES, DEFAULT_CITY } from '../../const';
import Logo from '../../components/logo/logo';
import { changeCity } from '../../store/data-process/data-process';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function LoginPage(): JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [randomCity, setRandomCity] = useState<typeof CITIES[number]>(DEFAULT_CITY);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    let isMounted = true;

    const randomIndex = Math.floor(Math.random() * CITIES.length);

    if (isMounted) {
      setRandomCity(CITIES[randomIndex]);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }

    return () => {
      isMounted = false;
    };
  }, [authorizationStatus, navigate]);

  const validatePassword = (password: string): boolean => (
    /[a-zA-Z]/.test(password) && /\d/.test(password)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!validatePassword(formData.password)) {
      setPasswordError('Password must contain at least one letter and one digit');
      return;
    }

    setPasswordError(null);
    dispatch(loginAction({
      email: formData.email,
      password: formData.password
    }));
  };

  const handleRandomCityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(changeCity(randomCity));
    navigate(AppRoute.Root);
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {passwordError && (
                  <p className="login__error-message">{passwordError}</p>
                )}
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button
                className="locations__item-link"
                onClick={handleRandomCityClick}
              >
                <span>{randomCity}</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
