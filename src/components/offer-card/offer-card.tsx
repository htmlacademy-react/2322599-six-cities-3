import React, { useCallback } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeFavoriteStatus } from '../../store/api-actions';
import { Offer, CardListType } from '../../types/offers';
import { AppRoute } from '../../const';
import './offer-card.css';

type OfferCardProps = {
  offer: Offer;
  block: CardListType;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
};

function OfferCardComponent({
  offer,
  block = 'cities',
  onMouseEnter,
  onMouseLeave
}: OfferCardProps) {
  const dispatch = useAppDispatch();
  const {
    id,
    title,
    type,
    price,
    isPremium,
    isFavorite,
    rating,
    previewImage,
  } = offer;

  const widthPercent = Math.round(rating) * 20;
  const ratingLineClass = `rating__stars-${widthPercent}`;

  const handleFavoriteClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(changeFavoriteStatus({
      offerId: id,
      status: !isFavorite
    }));
  }, [dispatch, id, isFavorite]);

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
        <Link to={generatePath(AppRoute.Offer, { id })}>
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
          <Link to={generatePath(AppRoute.Offer, { id })}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export const OfferCard = React.memo(OfferCardComponent);
