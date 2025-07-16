import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OfferList from '../../components/offer-list/offer-list';
import { getFavoriteOffers, getIsFavoriteOffersLoading, getFavoriteOffersError } from '../../store/data-process/selectors';
import { fetchFavoriteOffers } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import { toast } from 'react-toastify';
import classNames from 'classnames';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isLoading = useAppSelector(getIsFavoriteOffersLoading);
  const error = useAppSelector(getFavoriteOffersError);

  const isEmpty = favoriteOffers.length === 0;

  useEffect(() => {
    dispatch(fetchFavoriteOffers())
      .unwrap()
      .catch(() => {
        toast.error('Failed to load favorite offers. Please try again later.');
      });
  }, [dispatch]);

  const handleRetryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(fetchFavoriteOffers());
  };

  const offersByCity = favoriteOffers.reduce<Record<string, typeof favoriteOffers>>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});

  const sortedCities = CITIES.filter((city) => offersByCity[city]?.length > 0);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="page page--favorites">
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Error loading favorites</b>
                <p className="favorites__status-description">
                  Failed to load your favorite offers. Please try again later.
                </p>
                <button
                  className="favorites__retry-button button"
                  onClick={handleRetryClick}
                >
                  Try again
                </button>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={classNames('page', {
      'page--favorites-empty': isEmpty
    })}
    >
      <Helmet>
        <title>6 cities. Your favorites</title>
      </Helmet>

      <main className={classNames('page__main', 'page__main--favorites', {
        'page__main--favorites-empty': isEmpty
      })}
      >
        <div className="page__favorites-container container">
          {isEmpty ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                <Link to={AppRoute.Root} className="favorites__status-link">
                  Go to main page
                </Link>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {sortedCities.map((cityName) => (
                  <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a
                          className="locations__item-link"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferList
                        offers={offersByCity[cityName]}
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
      <Footer />
    </div>
  );
}

export default FavoritesPage;
