import OfferCard from '../offer-card/offer-card';
import { Offer, FavoriteData } from '../../types/offers';

type OfferListProps = {
  offers: Offer[];
  onFavoriteToggle?: (data: FavoriteData) => void;
};

function OfferList({ offers, onFavoriteToggle }: OfferListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          id={offer.id}
          title={offer.title}
          type={offer.type}
          price={offer.price}
          isPremium={offer.isPremium}
          isFavorite={offer.isFavorite}
          rating={offer.rating}
          previewImage={offer.previewImage}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </>
  );
}

export default OfferList;
