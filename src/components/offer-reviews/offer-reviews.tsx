import { Review } from '../../types/reviews';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import { useMemo } from 'react';
import { MAX_REVIEWS_COUNT } from '../../const';

type OfferReviewsProps = {
  reviews: Review[];
  isCommentsLoading: boolean;
  isAuth: boolean;
  onReviewSubmit: (comment: string, rating: number) => Promise<void>;
};

function OfferReviews({ reviews, isCommentsLoading, isAuth, onReviewSubmit }: OfferReviewsProps): JSX.Element {
  const sortedAndLimitedReviews = useMemo(() =>
    [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_REVIEWS_COUNT), [reviews]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {!isCommentsLoading && <ReviewsList reviews={sortedAndLimitedReviews} />}
      {isAuth && <ReviewForm onSubmit={onReviewSubmit} />}
    </section>
  );
}

export default OfferReviews;
