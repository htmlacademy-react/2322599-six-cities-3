import { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OfferList from '../../components/offer-list/offer-list';
import { CitiesList } from '../../components/cities-list/cities-list';
import { SortingOptions } from '../../components/sorting-options/sorting-options';
import { getCurrentCityName, getCurrentCityOffers } from '../../store/data-process/selectors';
import { changeCity } from '../../store/data-process/data-process';
import type { CityName } from '../../components/cities-list/cities-list';
import type { SortOption } from '../../components/sorting-options/sorting-options';

function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<SortOption>('Popular');
  const dispatch = useAppDispatch();

  const currentCityName = useAppSelector(getCurrentCityName) as CityName;
  const currentCityOffers = useAppSelector(getCurrentCityOffers);

  useEffect(() => {
    dispatch(changeCity('Paris'));
  }, [dispatch]);

  const sortedOffers = useMemo(() => {
    const offersCopy = [...currentCityOffers];

    switch (currentSort) {
      case 'Price: low to high':
        return offersCopy.sort((a, b) => a.price - b.price);

      case 'Price: high to low':
        return offersCopy.sort((a, b) => b.price - a.price);

      case 'Top rated first':
        return offersCopy.sort((a, b) => b.rating - a.rating);

      case 'Popular':
      default:
        return offersCopy;
    }
  }, [currentCityOffers, currentSort]);

  const handleCityChange = useCallback((city: CityName) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  const handleCardMouseEnter = useCallback((id: string) => {
    setActiveOfferId(id);
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setActiveOfferId(null);
  }, []);

  const handleSortChange = useCallback((option: SortOption) => {
    setCurrentSort(option);
  }, []);

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
                {sortedOffers.length} {sortedOffers.length === 1 ? 'place' : 'places'} to stay in {currentCityName}
              </b>

              <SortingOptions
                currentOption={currentSort}
                onOptionChange={handleSortChange}
              />

              <OfferList
                offers={sortedOffers}
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
