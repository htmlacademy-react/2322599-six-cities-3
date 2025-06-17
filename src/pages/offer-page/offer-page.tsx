import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import { Offer } from '../../types/offers';
import { Review } from '../../types/reviews';
import ReviewForm from '../../components/review-form/review-form';

type OfferPageProps = {
  offers: Offer[];
  reviews: Review[];
};

function OfferPage({ offers, reviews }: OfferPageProps): JSX.Element {
  const currentOffer = offers[0];
  const nearOffers = offers.slice(1, 4);

  return (
    <>
      <Helmet>
        <title>6 cities. Offer details</title>
      </Helmet>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${currentOffer.rating * 20}%` }} />
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
                  {currentOffer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{currentOffer.host.name}</span>
                  {currentOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>

              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {reviews.map((review) => (
                    <li key={review.id} className="reviews__item">
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                        </div>
                        <span className="reviews__user-name">{review.user.name}</span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{ width: `${review.rating * 20}%` }} />
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">{review.comment}</p>
                        <time className="reviews__time" dateTime={review.date}>
                          {new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </time>
                      </div>
                    </li>
                  ))}
                </ul>
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={currentOffer.city}
              offers={[currentOffer, ...nearOffers]}
              selectedOfferId={currentOffer.id}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((offer) => (
                <article key={offer.id} className="near-places__card place-card">
                  {offer.isPremium && (
                    <div className="place-card__mark">
                      <span>Premium</span>
                    </div>
                  )}
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <a href="#">
                      <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">€{offer.price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                      <button className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                          <use xlinkHref="#icon-bookmark" />
                        </svg>
                        <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: `${offer.rating * 20}%` }} />
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="#">{offer.title}</a>
                    </h2>
                    <p className="place-card__type">{offer.type}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default OfferPage;
