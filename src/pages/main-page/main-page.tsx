import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OfferList from '../../components/offer-list/offer-list';
import CitiesList from '../../components/cities-list/cities-list';
import { getCurrentCityName, getCurrentCityOffers } from '../../store/selectors';
import { changeCity } from '../../store/action';
import type { CityName } from '../../components/cities-list/cities-list';

function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const currentCityName = useAppSelector(getCurrentCityName) as CityName;
  const currentCityOffers = useAppSelector(getCurrentCityOffers);

  useEffect(() => {
    dispatch(changeCity('Paris'));
  }, [dispatch]);

  const handleCityChange = (city: CityName) => {
    dispatch(changeCity(city));
  };

  const handleCardMouseEnter = (id: string) => {
    setActiveOfferId(id);
  };

  const handleCardMouseLeave = () => {
    setActiveOfferId(null);
  };

  const currentCity = currentCityOffers.length > 0
    ? currentCityOffers[0].city
    : {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 12
      }
    };

  return (
    <>
      <Helmet>
        <title>6 cities. Choose your perfect place to stay</title>
      </Helmet>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            currentCity={currentCityName}
            onCityChange={handleCityChange}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentCityOffers.length} {currentCityOffers.length === 1 ? 'place' : 'places'} to stay in {currentCityName}
              </b>
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
