import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OfferList from '../../components/offer-list/offer-list';
import { getFavoriteOffers, getIsFavoriteOffersLoading } from '../../store/data-process/selectors';
import { fetchFavoriteOffers } from '../../store/api-actions';
import { useMemo } from 'react';
import Spinner from '../../components/spinner/spinner';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isLoading = useAppSelector(getIsFavoriteOffersLoading);

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  const offersByCity = useMemo(() =>
    favoriteOffers.reduce<Record<string, typeof favoriteOffers>>((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {}), [favoriteOffers]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>6 cities. Your favorites</title>
      </Helmet>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                  <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferList
                        offers={cityOffers}
                        block="favorites"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default FavoritesPage;
