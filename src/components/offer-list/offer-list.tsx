import OfferCard from '../offer-card/offer-card';
import { Offer, CardListType } from '../../types/offers';

type OfferListProps = {
  offers: Offer[];
  onCardMouseEnter?: (id: string) => void;
  onCardMouseLeave?: () => void;
  onFavoriteToggle?: (data: { offerId: string; status: boolean }) => void;
  block: CardListType;
};

function OfferList({
  offers,
  onCardMouseEnter,
  onCardMouseLeave,
  onFavoriteToggle,
  block = 'cities'
}: OfferListProps): JSX.Element {
  return (
    <div className={`${block}__${block === 'favorites' ? 'places' : 'places-list'} places__list tabs__content`}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
          onFavoriteToggle={onFavoriteToggle}
          block={block}
        />
      ))}
    </div>
  );
}

export default OfferList;
