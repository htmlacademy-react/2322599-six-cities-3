import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offers';
import { Review } from '../../types/reviews';

export const getCurrentCityName = (state: State): string => state[NameSpace.Data].currentCityName;
export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getIsOffersDataLoading = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getOffersError = (state: State): boolean => state[NameSpace.Data].offersError;
export const getComments = (state: State): Review[] => state[NameSpace.Data].comments;
export const getIsCommentsLoading = (state: State): boolean => state[NameSpace.Data].isCommentsLoading;
export const getCurrentOffer = (state: State): Offer | null => state[NameSpace.Data].currentOffer;
export const getNearOffers = (state: State): Offer[] => state[NameSpace.Data].nearOffers;
export const getIsOfferLoading = (state: State): boolean => state[NameSpace.Data].isOfferLoading;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;
export const getIsFavoriteOffersLoading = (state: State): boolean => state[NameSpace.Data].isFavoriteOffersLoading;

export const getCurrentCityOffers = (state: State): Offer[] => {
  const cityName = getCurrentCityName(state);
  const offers = getOffers(state);
  return offers.filter((offer) => offer.city.name === cityName);
};
