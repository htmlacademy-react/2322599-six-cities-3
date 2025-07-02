import { createReducer } from '@reduxjs/toolkit';
import { changeCity, updateOfferFavoriteStatus, loadOffers, setIsLoading, requireAuthorization, setError } from './action'; // Добавлено setError
import { DEFAULT_CITY, AuthorizationStatus } from '../const';
import type { Offer, FavoriteData } from '../types/offers';

export type State = {
  currentCityName: string;
  offers: Offer[];
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
};

const initialState: State = {
  currentCityName: DEFAULT_CITY,
  offers: [],
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
