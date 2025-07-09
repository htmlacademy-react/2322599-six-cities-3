import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MainOffers from '../../components/main-offers/main-offers';
import CitiesList from '../../components/cities-list/cities-list';
import { getCurrentCityName, getCurrentCityOffers } from '../../store/selectors';
import { changeCity } from '../../store/action';
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

  const handleCityChange = (city: CityName) => {
    dispatch(changeCity(city));
  };

  const handleCardMouseEnter = (id: string) => {
    setActiveOfferId(id);
  };

  const handleCardMouseLeave = () => {
    setActiveOfferId(null);
  };

  const handleSortChange = (option: SortOption) => {
    setCurrentSort(option);
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

        <MainOffers
          sortedOffers={sortedOffers}
          currentCity={currentCity}
          currentCityName={currentCityName}
          currentSort={currentSort}
          onSortChange={handleSortChange}
          onCardMouseEnter={handleCardMouseEnter}
          onCardMouseLeave={handleCardMouseLeave}
          selectedOfferId={activeOfferId}
        />
      </main>
    </>
  );
}

export default MainPage;
