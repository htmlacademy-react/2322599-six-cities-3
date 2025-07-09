import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Map from '../../components/map/map';
import NearPlaces from '../../components/near-places/near-places';
import OfferDetails from '../../components/offer-details/offer-details';
import OfferReviews from '../../components/offer-reviews/offer-reviews';
import { getComments, getIsCommentsLoading, getCurrentOffer, getNearOffers, getIsOfferLoading, getAuthorizationStatus } from '../../store/selectors';
import NotFoundPage from '../not-found-page/not-found-page';
import Spinner from '../../components/spinner/spinner';
import { useEffect } from 'react';
import { changeFavoriteStatus, fetchCommentsAction, postCommentAction, fetchOfferAction, fetchNearOffersAction } from '../../store/api-actions';
import { setCurrentOffer, setNearOffers, setComments } from '../../store/action';
import { AuthorizationStatus } from '../../const';
import { toast } from 'react-toastify';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

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

    return () => {
      dispatch(setCurrentOffer(null));
      dispatch(setNearOffers([]));
      dispatch(setComments([]));
    };
  }, [dispatch, id]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!currentOffer || !id) {
    return <NotFoundPage />;
  }

  const handleFavoriteClick = () => {
    dispatch(changeFavoriteStatus({
      offerId: id,
      status: !currentOffer.isFavorite
    }));
  };

  const handleReviewSubmit = async (comment: string, rating: number) => {
    try {
      await dispatch(postCommentAction({ offerId: id, comment, rating })).unwrap();
      toast.success('Comment successfully posted!');
    } catch {
      toast.error('Failed to post comment');
    }
  };

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <>
      <Helmet>
        <title>6 cities. Offer details</title>
      </Helmet>

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferDetails offer={currentOffer} onFavoriteClick={handleFavoriteClick} />

          <OfferReviews
            reviews={comments}
            isCommentsLoading={isCommentsLoading}
            isAuth={isAuth}
            onReviewSubmit={handleReviewSubmit}
          />

          <section className="offer__map map">
            <Map
              city={currentOffer.city}
              offers={[currentOffer, ...nearOffers]}
              selectedOfferId={currentOffer.id}
            />
          </section>
        </section>

        <div className="container">
          <NearPlaces nearOffers={nearOffers} />
        </div>
      </main>
    </>
  );
}

export default OfferPage;
