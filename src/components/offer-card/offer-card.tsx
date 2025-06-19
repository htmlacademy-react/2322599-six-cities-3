import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteData, Offer, CardListType } from '../../types/offers';
import './offer-card.css';

type OfferCardProps = {
  offer: Offer;
  onFavoriteToggle?: (data: FavoriteData) => void;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  block: CardListType;
};

function OfferCard({
  offer,
  onFavoriteToggle,
  onMouseEnter,
  onMouseLeave,
  block = 'cities'
}: OfferCardProps): JSX.Element {
  const {
    id,
    title,
    type,
    price,
    isPremium,
    isFavorite: initialIsFavorite,
    rating,
    previewImage,
  } = offer;

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const widthPercent = Math.round(rating) * 20;
  const ratingLineClass = `rating__stars-${widthPercent}`;

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);

    onFavoriteToggle?.({
      offerId: id,
      status: newStatus
    });
  };

  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={() => onMouseEnter?.(id)}
      onMouseLeave={() => onMouseLeave?.()}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
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
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span className={ratingLineClass}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
