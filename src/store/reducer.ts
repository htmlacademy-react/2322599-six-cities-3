import { createReducer } from '@reduxjs/toolkit';
import { changeCity, updateOfferFavoriteStatus, loadOffers, setIsLoading, requireAuthorization, setOffersDataLoadingStatus, setUserData, setComments, setCommentsLoadingStatus } from './action';
import { DEFAULT_CITY, AuthorizationStatus } from '../const';
import type { Offer, FavoriteData } from '../types/offers';
import type { UserData } from '../types/user-data';
import type { Review } from '../types/reviews';

export type State = {
  currentCityName: string;
  offers: Offer[];
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  userData: UserData | null;
  comments: Review[];
  isCommentsLoading: boolean;
};

const initialState: State = {
  currentCityName: DEFAULT_CITY,
  offers: [],
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  userData: null,
  comments: [],
  isCommentsLoading: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCityName = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(updateOfferFavoriteStatus, (state, action) => {
      const payload: FavoriteData = action.payload;
      const offerIndex = state.offers.findIndex((offer) => offer.id === payload.offerId);

      if (offerIndex !== -1) {
        state.offers[offerIndex].isFavorite = payload.status;
      }
    })
    .addCase(setIsLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setCommentsLoadingStatus, (state, action) => {
      state.isCommentsLoading = action.payload;
    });
});

export { reducer };
