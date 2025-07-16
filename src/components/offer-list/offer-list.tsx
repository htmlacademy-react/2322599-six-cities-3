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
  let listClassName = '';

  if (block === 'favorites') {
    listClassName = 'favorites__places';
  } else if (block === 'near-places') {
    listClassName = 'near-places__list places__list';
  } else {
    listClassName = 'cities__places-list places__list tabs__content';
  }

  return (
    <div className={listClassName}>
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
