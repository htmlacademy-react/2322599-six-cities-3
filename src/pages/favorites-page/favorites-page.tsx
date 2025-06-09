import OfferCard from '../../components/offer-card/offer-card';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offers';

type FavoritesPageProps = {
  offers: Offer[];
};

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  const handleFavoriteToggle = () => {
    // Обработка изменения статуса "Избранное"
  };

  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

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
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffers.map((offer) => (
                      <OfferCard
                        key={offer.id}
                        isPremium={offer.isPremium}
                        imageSrc={offer.previewImage}
                        price={offer.price}
                        isFavorite={offer.isFavorite}
                        rating={offer.rating}
                        title={offer.title}
                        type={offer.type}
                        id={offer.id}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
                    ))}
                  </div>
                </li>
              </ul>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default FavoritesPage;
