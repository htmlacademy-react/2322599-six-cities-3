import { Review } from '../../types/reviews';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';

type OfferReviewsProps = {
  reviews: Review[];
  isCommentsLoading: boolean;
  isAuth: boolean;
  onReviewSubmit: (comment: string, rating: number) => Promise<void>;
};

function OfferReviews({ reviews, isCommentsLoading, isAuth, onReviewSubmit }: OfferReviewsProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {!isCommentsLoading && <ReviewsList reviews={reviews} />}
      {isAuth && <ReviewForm onSubmit={onReviewSubmit} />}
    </section>
  );
}

export default OfferReviews;
