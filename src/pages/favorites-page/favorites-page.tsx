import OfferCard from '../../components/offer-card/offer-card';
import { mockOffers } from '../../mocks/offers';
import { Helmet } from 'react-helmet-async';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = mockOffers.filter((offer) => offer.isFavorite);

  return (
    <>
      <Helmet>
        <title>6 cities. Your favorites</title>
      </Helmet>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
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
                    />
                  ))}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

export default FavoritesPage;
