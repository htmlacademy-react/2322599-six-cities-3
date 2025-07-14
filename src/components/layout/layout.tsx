import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Logo from '../logo/logo';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/selectors';
import { getFavoriteOffers } from '../../store/data-process/selectors';

function Layout(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const handleSignOutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logoutAction());
    navigate(AppRoute.Root);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            {authorizationStatus === AuthorizationStatus.Auth ? (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="#"
                      onClick={() => navigate(AppRoute.Favorites)}
                    >
                      {userData && (
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{ backgroundImage: `url(${userData.avatarUrl})` }}
                        >
                        </div>
                      )}
                      {userData ? (
                        <span className="header__user-name user__name">
                          {userData.name}
                        </span>
                      ) : null}
                      <span className="header__favorite-count">{favoriteOffers.length}</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#"
                      onClick={handleSignOutClick}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            ) : (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="#"
                      onClick={() => navigate(AppRoute.Login)}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}

export default Layout;
