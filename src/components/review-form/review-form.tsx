import { useState, FormEvent, ChangeEvent, Fragment } from 'react';

const RATING_VALUES = [5, 4, 3, 2, 1];

function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '0',
    review: ''
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: evt.target.value });
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, review: evt.target.value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

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
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={formData.review.length < 50 || formData.rating === '0'}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
