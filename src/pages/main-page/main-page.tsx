import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import OfferList from '../../components/offer-list/offer-list';
import { Settings } from '../../const';
import { getCurrentCityName, getCurrentCityOffers } from '../../store/selectors';

function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const currentCityName = useAppSelector(getCurrentCityName);
  const currentCityOffers = useAppSelector(getCurrentCityOffers);

  const currentCity = currentCityOffers.length > 0
    ? currentCityOffers[0].city
    : {
      name: 'Amsterdam',
      location: {
        latitude: 52.374031,
        longitude: 4.88969,
        zoom: 12
      }
    };

  const handleCardMouseEnter = (id: string) => {
    setActiveOfferId(id);
  };

  const handleCardMouseLeave = () => {
    setActiveOfferId(null);
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
                  <a
                    className={`locations__item-link tabs__item ${cityName === currentCityName ? 'tabs__item--active' : ''}`}
                    href="#"
                  >
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
              <b className="places__found">{currentCityOffers.length} places to stay in {currentCityName}</b>
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
              <OfferList
                offers={currentCityOffers}
                onCardMouseEnter={handleCardMouseEnter}
                onCardMouseLeave={handleCardMouseLeave}
                block="cities"
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={currentCity}
                  offers={currentCityOffers}
                  selectedOfferId={activeOfferId || undefined}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
