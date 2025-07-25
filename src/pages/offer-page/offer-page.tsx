import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Map } from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { getComments, getIsCommentsLoading, getCurrentOffer, getNearOffers, getIsOfferLoading } from '../../store/data-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import NotFoundPage from '../not-found-page/not-found-page';
import Spinner from '../../components/spinner/spinner';
import { useEffect } from 'react';
import { changeFavoriteStatus, postCommentAction, fetchOfferAction, fetchNearOffersAction, fetchCommentsAction } from '../../store/api-actions';
import { AuthorizationStatus, AppRoute } from '../../const';
import { toast } from 'react-toastify';
import OfferReviews from '../../components/offer-reviews/offer-reviews';
import { OfferGallery } from '../../components/offer-gallery/offer-gallery';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentOffer = useAppSelector(getCurrentOffer);
  const nearOffers = useAppSelector(getNearOffers);
  const comments = useAppSelector(getComments);
  const isCommentsLoading = useAppSelector(getIsCommentsLoading);
  const isOfferLoading = useAppSelector(getIsOfferLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [dispatch, id]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!currentOffer || !id) {
    return <NotFoundPage />;
  }

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      return;
    }

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(changeFavoriteStatus({
      offerId: id,
      status: !currentOffer.isFavorite
    })).catch(() => {
      toast.error('Failed to update favorite status');
    });
  };

  const handleReviewSubmit = async (comment: string, rating: number) => {
    try {
      await dispatch(postCommentAction({
        offerId: id,
        comment,
        rating
      })).unwrap();

      toast.success('Comment successfully posted!');
    } catch {
      toast.error('Failed to post comment');
    }
  };

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const displayedNearOffers = nearOffers.slice(0, 3);

  const ratingWidth = `${Math.round(currentOffer.rating) * 20}%`;

  return (
    <>
      <Helmet>
        <title>6 cities. Offer details</title>
      </Helmet>

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={currentOffer.images} />

          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods?.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${currentOffer.host?.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host?.avatarUrl || ''}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer.host?.name || ''}</span>
                  {currentOffer.host?.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>

              <OfferReviews
                reviews={comments}
                isCommentsLoading={isCommentsLoading}
                isAuth={isAuth}
                onReviewSubmit={handleReviewSubmit}
              />
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={currentOffer.city}
              offers={[currentOffer, ...displayedNearOffers]}
              selectedOfferId={currentOffer.id}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              offers={displayedNearOffers}
              block="near-places"
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default OfferPage;
