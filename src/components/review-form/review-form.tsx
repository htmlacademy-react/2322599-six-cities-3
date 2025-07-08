import { useState, FormEvent, ChangeEvent, Fragment } from 'react';
import { toast } from 'react-toastify';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;
const RATING_VALUES = [5, 4, 3, 2, 1];

type ReviewFormProps = {
  onSubmit: (comment: string, rating: number) => Promise<void>;
};

function ReviewForm({ onSubmit }: ReviewFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '0',
    review: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: evt.target.value });
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, review: evt.target.value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmitting(true);
    setError(null);

    (async () => {
      try {
        await onSubmit(formData.review, Number(formData.rating));
        setFormData({
          rating: '0',
          review: ''
        });
        toast.success('Comment successfully posted!');
      } catch (err) {
        setError('Failed to post comment. Please try again.');
        toast.error('Failed to post comment');
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const isValid =
    formData.review.length >= MIN_COMMENT_LENGTH &&
    formData.review.length <= MAX_COMMENT_LENGTH &&
    formData.rating !== '0';

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map((rating) => (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating}
              id={`${rating}-stars`}
              type="radio"
              checked={formData.rating === String(rating)}
              onChange={handleRatingChange}
              disabled={isSubmitting}
            />
            <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleReviewChange}
        disabled={isSubmitting}
      />

      {error && (
        <p className="reviews__help" style={{ color: '#ff0000', marginBottom: '10px' }}>
          {error}
        </p>
      )}

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
