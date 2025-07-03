import { createReducer } from '@reduxjs/toolkit';
import { changeCity, updateOfferFavoriteStatus, loadOffers, setIsLoading, requireAuthorization, setOffersDataLoadingStatus, setUserData } from './action';
import { DEFAULT_CITY, AuthorizationStatus } from '../const';
import type { Offer, FavoriteData } from '../types/offers';
import type { UserData } from '../types/user-data';

export type State = {
  currentCityName: string;
  offers: Offer[];
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  userData: UserData | null;
};

const initialState: State = {
  currentCityName: DEFAULT_CITY,
  offers: [],
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  userData: null
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
    });
});

export { reducer };
