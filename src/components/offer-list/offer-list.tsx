import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offers';

type OfferListProps = {
  offers: Offer[];
  onCardMouseEnter?: (id: string) => void;
  onCardMouseLeave?: () => void;
  onFavoriteToggle?: (data: { offerId: string; status: boolean }) => void;
};

function OfferList({
  offers,
  onCardMouseEnter,
  onCardMouseLeave,
  onFavoriteToggle
}: OfferListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </>
  );
}

export default OfferList;
