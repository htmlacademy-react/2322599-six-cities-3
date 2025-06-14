import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus, Settings } from '../../const';
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
  settings: typeof Settings;
  offers: Offer[];
  reviews: Review[];
}

function App({ settings, offers, reviews }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout authorizationStatus={AuthorizationStatus.Auth} />}>
            <Route
              path={AppRoute.Root}
              element={<MainPage offersCount={settings.OffersCount} city={settings.City} offers={offers} />}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                  <FavoritesPage offers={offers} />
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Offer} element={<OfferPage offers={offers} reviews={reviews} />} />
          </Route>

          <Route path={AppRoute.Login} element={<LoginPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
