import React, { useCallback } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatus } from '../../store/api-actions';
import { Offer, CardListType } from '../../types/offers';
import { AppRoute, AuthorizationStatus } from '../../const';
import classNames from 'classnames';
import './offer-card.css';
import { toast } from 'react-toastify';

const getTypeName = (type: string) => {
  switch (type) {
    case 'apartment':
      return 'Apartment';
    case 'room':
      return 'Private Room';
    case 'house':
      return 'House';
    case 'hotel':
      return 'Hotel';
    default:
      return type;
  }
};

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
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);

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

  const roundedRating = Math.round(rating);
  const widthPercent = roundedRating * 20;
  const ratingLineClass = `rating__stars-${widthPercent}`;

  const handleFavoriteClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(changeFavoriteStatus({
      offerId: id,
      status: !isFavorite
    }))
      .unwrap()
      .catch(() => {
        toast.error('Failed to update favorite status');
      });
  }, [dispatch, id, isFavorite, authorizationStatus, navigate]);

  const cardClass = classNames(
    block === 'favorites' ? 'favorites__card' : `${block}__card`,
    'place-card'
  );

  return (
    <article
      className={cardClass}
      onMouseEnter={() => onMouseEnter?.(id)}
      onMouseLeave={() => onMouseLeave?.()}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${block === 'favorites' ? 'favorites__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Offer, { id })}>
          <img
            className="place-card__image"
            src={previewImage}
            width={block === 'favorites' ? '150' : '260'}
            height={block === 'favorites' ? '110' : '200'}
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
            <span className="visually-hidden">Rating: {roundedRating} stars</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id })}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{getTypeName(type)}</p>
      </div>
    </article>
  );
}

export const OfferCard = React.memo(OfferCardComponent);
