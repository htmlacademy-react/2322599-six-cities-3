import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks/index';
import { AppRoute, AuthorizationStatus } from '../../const';
import { fillOffers } from '../../store/action';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { Offer } from '../../types/offers';
import { Review } from '../../types/reviews';

type AppProps = {
  offers: Offer[];
  reviews: Review[];
}

function App({ offers, reviews }: AppProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fillOffers(offers));
  }, [dispatch, offers]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout authorizationStatus={AuthorizationStatus.Auth} />}>
            <Route
              path={AppRoute.Root}
              element={<MainPage />}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={<OfferPage offers={offers} reviews={reviews} />}
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
