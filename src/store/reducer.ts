import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffers, updateOfferFavoriteStatus } from './action';
import { Settings } from '../const';
import type { Offer } from '../types/offers';

export type State = {
  currentCityName: string;
  offers: Offer[];
};

const initialState: State = {
  currentCityName: Settings.City,
  offers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCityName = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(updateOfferFavoriteStatus, (state, action) => {
      const { offerId, status } = action.payload;
      const offerIndex = state.offers.findIndex((offer) => offer.id === offerId);

      if (offerIndex !== -1) {
        state.offers[offerIndex].isFavorite = status;
      }
    });
});

export { reducer };
