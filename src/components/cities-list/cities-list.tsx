import React from 'react';
import { CITIES, CityName } from '../../const';

type CitiesListProps = {
  currentCity: CityName;
  onCityChange: (city: CityName) => void;
};

function CitiesListComponent({ currentCity, onCityChange }: CitiesListProps) {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li key={city} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onCityChange(city);
              }}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const CitiesList = React.memo(CitiesListComponent);
