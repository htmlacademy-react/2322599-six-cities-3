import { OfferCard } from '../offer-card/offer-card';
import { Offer, CardListType } from '../../types/offers';

type OfferListProps = {
  offers: Offer[];
  onCardMouseEnter?: (id: string) => void;
  onCardMouseLeave?: () => void;
  block: CardListType;
};

function OfferList({
  offers,
  onCardMouseEnter,
  onCardMouseLeave,
  block = 'cities'
}: OfferListProps): JSX.Element {
  return (
    <div className={
      block === 'favorites'
        ? 'favorites__places'
        : `${block}__places-list places__list tabs__content`
    }
    >
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
          block={block}
        />
      ))}
    </div>
  );
}

export default OfferList;
