import { Offer } from '../../types/offers';
import OfferList from '../offer-list/offer-list';

type NearPlacesProps = {
  nearOffers: Offer[];
};

function NearPlaces({ nearOffers }: NearPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <OfferList
        offers={nearOffers}
        block="near-places"
      />
    </section>
  );
}

export default NearPlaces;
