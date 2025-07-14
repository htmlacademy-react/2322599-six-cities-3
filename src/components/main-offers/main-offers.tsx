import { Offer, City } from '../../types/offers';
import { SortOption } from '../../components/sorting-options/sorting-options';
import { Map } from '../map/map';
import { SortingOptions } from '../sorting-options/sorting-options';
import OfferList from '../offer-list/offer-list';

type MainOffersProps = {
  sortedOffers: Offer[];
  currentCity: City;
  currentCityName: string;
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
  onCardMouseEnter: (id: string) => void;
  onCardMouseLeave: () => void;
  selectedOfferId: string | null;
};

function MainOffers({
  sortedOffers,
  currentCity,
  currentCityName,
  currentSort,
  onSortChange,
  onCardMouseEnter,
  onCardMouseLeave,
  selectedOfferId
}: MainOffersProps): JSX.Element {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {sortedOffers.length} {sortedOffers.length === 1 ? 'place' : 'places'} to stay in {currentCityName}
          </b>

          <SortingOptions
            currentOption={currentSort}
            onOptionChange={onSortChange}
          />

          <OfferList
            offers={sortedOffers}
            onCardMouseEnter={onCardMouseEnter}
            onCardMouseLeave={onCardMouseLeave}
            block="cities"
          />
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              city={currentCity}
              offers={sortedOffers}
              selectedOfferId={selectedOfferId || undefined}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainOffers;
