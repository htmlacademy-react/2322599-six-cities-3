import { createReducer } from '@reduxjs/toolkit';
import { changeCity, updateOfferFavoriteStatus, loadOffers, setIsLoading } from './action';
import { DEFAULT_CITY } from '../const';
import type { Offer, FavoriteData } from '../types/offers';

export type State = {
  currentCityName: string;
  offers: Offer[];
  isLoading: boolean;
};

const initialState: State = {
  currentCityName: DEFAULT_CITY,
  offers: [],
  isLoading: false
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
    });
});

export { reducer };
