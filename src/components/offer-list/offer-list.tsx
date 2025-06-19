import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offers';

type OfferListProps = {
  offers: Offer[];
  onCardMouseEnter?: (id: string) => void;
  onCardMouseLeave?: () => void;
  onFavoriteToggle?: (data: { offerId: string; status: boolean }) => void;
  listType?: 'main' | 'nearby';
};

function OfferList({
  offers,
  onCardMouseEnter,
  onCardMouseLeave,
  onFavoriteToggle,
  listType = 'main'
}: OfferListProps): JSX.Element {
  return (
    <div className={`${listType === 'nearby' ? 'near-places' : 'cities__places'}-list places__list tabs__content`}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
          onFavoriteToggle={onFavoriteToggle}
          cardType={listType}
        />
      ))}
    </div>
  );
}

export default OfferList;
