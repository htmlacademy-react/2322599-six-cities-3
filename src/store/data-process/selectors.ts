import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { createSelector } from '@reduxjs/toolkit';

export const getCurrentCityName = (state: State) => state[NameSpace.Data].currentCityName;
export const getOffers = (state: State) => state[NameSpace.Data].offers;
export const getIsOffersDataLoading = (state: State) => state[NameSpace.Data].isOffersDataLoading;
export const getComments = (state: State) => state[NameSpace.Data].comments;
export const getIsCommentsLoading = (state: State) => state[NameSpace.Data].isCommentsLoading;
export const getCurrentOffer = (state: State) => state[NameSpace.Data].currentOffer;
export const getNearOffers = (state: State) => state[NameSpace.Data].nearOffers;
export const getIsOfferLoading = (state: State) => state[NameSpace.Data].isOfferLoading;

export const getCurrentCityOffers = createSelector(
  [getCurrentCityName, getOffers],
  (city, offers) => offers.filter((offer) => offer.city.name === city)
);
