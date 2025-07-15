import { useState, FormEvent, ChangeEvent, Fragment, useEffect } from 'react';
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
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    setCharacterCount(formData.review.length);
  }, [formData.review]);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: evt.target.value });
    setError(null);
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, review: evt.target.value });
    setError(null);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formData.rating === '0') {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const submitReview = async () => {
      try {
        await onSubmit(formData.review, Number(formData.rating));
        setFormData({
          rating: '0',
          review: ''
        });
        toast.success('Review submitted successfully!');
      } catch (err) {
        setError('Failed to submit review. Please try again.');
        toast.error('Failed to submit review');
      } finally {
        setIsSubmitting(false);
      }
    };

    submitReview();
  };

  const isReviewValid =
    formData.review.length >= MIN_COMMENT_LENGTH &&
    formData.review.length <= MAX_COMMENT_LENGTH;

  const isRatingValid = formData.rating !== '0';

  const isValid = isReviewValid && isRatingValid;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
        {error && <span className="reviews__error-message"> — {error}</span>}
      </label>

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
            <label
              htmlFor={`${rating}-stars`}
              className="reviews__rating-label form__rating-label"
              title={['terribly', 'badly', 'not bad', 'good', 'perfect'][rating - 1]}
            >
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

      <div className="reviews__character-count">
        {characterCount}/{MAX_COMMENT_LENGTH} characters
        {characterCount < MIN_COMMENT_LENGTH && (
          <span className="reviews__character-warning">
            (minimum {MIN_COMMENT_LENGTH} characters)
          </span>
        )}
        {characterCount > MAX_COMMENT_LENGTH && (
          <span className="reviews__character-warning">
            (maximum {MAX_COMMENT_LENGTH} characters)
          </span>
        )}
      </div>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
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
