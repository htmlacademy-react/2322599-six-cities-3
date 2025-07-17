import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import Logo from '../logo/logo';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/selectors';
import { getFavoriteOffers } from '../../store/data-process/selectors';

type LayoutProps = {
  pageType?: 'main' | 'login' | 'offer' | 'favorites';
};

function Layout({ pageType }: LayoutProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const handleSignOutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logoutAction())
      .unwrap()
      .then(() => {
        navigate(AppRoute.Login);
        toast.info('Logged out successfully');
      })
      .catch(() => {
        toast.error('Logout failed. Please try again.');
      });
  };

  const pageClasses = ['page'];

  if (pageType === 'main') {
    pageClasses.push('page--gray', 'page--main');
  } else if (pageType === 'login') {
    pageClasses.push('page--gray', 'page--login');
  } else if (pageType === 'favorites') {
    pageClasses.push('page--gray');
  } else if (pageType !== 'offer') {
    pageClasses.push('page--gray');
  }

  return (
    <div className={pageClasses.join(' ')}>
      <Helmet>
        <title>6 cities</title>
        <link rel="icon" href="/img/favicon.ico" />
      </Helmet>

      {pageType !== 'login' && (
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
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        {userData?.avatarUrl && (
                          <div
                            className="header__avatar-wrapper user__avatar-wrapper"
                            style={{ backgroundImage: `url(${userData.avatarUrl})` }}
                          />
                        )}
                        <span className="header__user-name user__name">
                          {userData?.email || ''}
                        </span>
                        <span className="header__favorite-count">{favoriteOffers.length}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link
                        className="header__nav-link"
                        to="#"
                        onClick={handleSignOutClick}
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              ) : (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Login}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </header>
      )}

      <Outlet />
    </div>
  );
}

export default Layout;
