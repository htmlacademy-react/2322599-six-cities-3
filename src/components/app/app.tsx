import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, generatePath } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
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
import {
  getIsLoading,
  getAuthorizationStatus,
  getIsOffersDataLoading
} from '../../store/selectors';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffers());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      {isLoading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout authorizationStatus={authorizationStatus} />}>
            <Route
              path={AppRoute.Root}
              element={<MainPage />}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route
              path={generatePath(AppRoute.Offer, { id: ':id' })}
              element={<OfferPage />}
            />
          </Route>
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
