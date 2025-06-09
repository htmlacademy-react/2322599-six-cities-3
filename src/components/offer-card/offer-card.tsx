import { useState } from 'react';
import { FavoriteData } from '../../types/offers';

type OfferCardProps = {
  isPremium: boolean;
  imageSrc: string;
  price: number;
  isFavorite: boolean;
  rating: number;
  title: string;
  type: string;
  id: string;
  onFavoriteToggle?: (data: FavoriteData) => void;
};

function OfferCard({
  isPremium,
  imageSrc,
  price,
  isFavorite: initialIsFavorite,
  rating,
  title,
  type,
  id,
  onFavoriteToggle
}: OfferCardProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const handleFavoriteClick = () => {
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);

    onFavoriteToggle?.({
      offerId: id,
      status: newStatus
    });
  };

  return (
    <article className="cities__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={imageSrc} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
