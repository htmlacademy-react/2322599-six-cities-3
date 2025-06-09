import OfferCard from '../../components/offer-card/offer-card';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offers';
import { Settings } from '../../const';

type MainPageProps = {
  offersCount: number;
  city: string;
  offers: Offer[];
};

function MainPage({ offersCount, city, offers }: MainPageProps): JSX.Element {
  const handleFavoriteToggle = () => {
    // Обработка изменения статуса "Избранное"
  };

  return (
    <>
      <Helmet>
        <title>6 cities. Choose your perfect place to stay</title>
      </Helmet>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Settings.Cities.map((cityName) => (
                <li key={cityName} className="locations__item">
                  <a className={`locations__item-link tabs__item ${cityName === city ? 'tabs__item--active' : ''}`} href="#">
                    <span>{cityName}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {offers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    id={offer.id}
                    title={offer.title}
                    type={offer.type}
                    price={offer.price}
                    isPremium={offer.isPremium}
                    isFavorite={offer.isFavorite}
                    rating={offer.rating}
                    previewImage={offer.previewImage}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
