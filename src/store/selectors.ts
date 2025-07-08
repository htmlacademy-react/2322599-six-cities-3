import { State } from './reducer';
import { createSelector } from '@reduxjs/toolkit';

export const getCurrentCityName = (state: State) => state.currentCityName;
export const getOffers = (state: State) => state.offers;
export const getIsLoading = (state: State) => state.isLoading;
export const getAuthorizationStatus = (state: State) => state.authorizationStatus;
export const getIsOffersDataLoading = (state: State) => state.isOffersDataLoading;
export const getUserData = (state: State) => state.userData;
export const getCurrentCityOffers = createSelector(
  [getCurrentCityName, getOffers],
  (city, offers) => offers.filter((offer) => offer.city.name === city)
);
export const getComments = (state: State) => state.comments;
export const getIsCommentsLoading = (state: State) => state.isCommentsLoading;
