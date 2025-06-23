import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffers } from './action';
import { Settings } from '../const';
import type { Offer } from '../types/offers';

type State = {
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
    });
});

export { reducer };
