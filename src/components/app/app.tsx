import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, generatePath, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { fetchOffers, checkAuthAction } from '../../store/api-actions';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import Spinner from '../spinner/spinner';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getIsOffersDataLoading } from '../../store/data-process/selectors';
import ServerErrorPage from '../../pages/server-error-page/server-error-page';

function AppContent() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout pageType="main" />}>
            <Route path={AppRoute.Root} element={<MainPage />} />
          </Route>

          <Route element={<Layout pageType="favorites" />}>
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
          </Route>

          <Route element={<Layout pageType="login" />}>
            <Route
              path={AppRoute.Login}
              element={
                authorizationStatus === AuthorizationStatus.Auth
                  ? <Navigate to={AppRoute.Root} />
                  : <LoginPage />
              }
            />
          </Route>

          <Route element={<Layout />}>
            <Route
              path={generatePath(AppRoute.Offer, { id: ':id' })}
              element={<OfferPage />}
            />
            <Route path="/server-error" element={<ServerErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffers());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <Spinner />;
  }

  return <AppContent />;
}

export default App;
