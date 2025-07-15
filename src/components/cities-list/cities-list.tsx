import React from 'react';
import { CITIES, CityName } from '../../const';
import classNames from 'classnames';

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
              className={classNames(
                'locations__item-link',
                'tabs__item',
                { 'tabs__item--active': city === currentCity }
              )}
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
