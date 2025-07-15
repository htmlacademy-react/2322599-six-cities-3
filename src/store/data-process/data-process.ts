import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, DEFAULT_CITY } from '../../const';
import { Offer, FavoriteData } from '../../types/offers';
import { Review } from '../../types/reviews';
import {
  fetchOffers,
  fetchCommentsAction,
  fetchOfferAction,
  fetchNearOffersAction,
  updateOfferFavoriteStatus,
  fetchFavoriteOffers
} from '../api-actions';

type DataProcessState = {
  currentCityName: string;
  offers: Offer[];
  isOffersDataLoading: boolean;
  offersError: boolean;
  comments: Review[];
  isCommentsLoading: boolean;
  currentOffer: Offer | null;
  nearOffers: Offer[];
  isOfferLoading: boolean;
  favoriteOffers: Offer[];
  isFavoriteOffersLoading: boolean;
  favoriteOffersError: boolean;
};

const initialState: DataProcessState = {
  currentCityName: DEFAULT_CITY,
  offers: [],
  isOffersDataLoading: false,
  offersError: false,
  comments: [],
  isCommentsLoading: false,
  currentOffer: null,
  nearOffers: [],
  isOfferLoading: false,
  favoriteOffers: [],
  isFavoriteOffersLoading: false,
  favoriteOffersError: false
};

export const dataProcessSlice = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.currentCityName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersDataLoading = true;
        state.offersError = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.offersError = true;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.comments = action.payload;
        state.isCommentsLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isCommentsLoading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action: PayloadAction<Offer>) => {
        state.currentOffer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
        state.currentOffer = null;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action: PayloadAction<Offer[]>) => {
        state.nearOffers = action.payload;
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = true;
        state.favoriteOffersError = false;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
        state.favoriteOffersError = true;
      })
      .addCase(updateOfferFavoriteStatus, (state, action: PayloadAction<FavoriteData>) => {
        const { offerId, status } = action.payload;

        const offerIndex = state.offers.findIndex((offer) => offer.id === offerId);
        if (offerIndex !== -1) {
          state.offers[offerIndex].isFavorite = status;
        }

        if (state.currentOffer && state.currentOffer.id === offerId) {
          state.currentOffer.isFavorite = status;
        }

        state.nearOffers = state.nearOffers.map((offer) =>
          offer.id === offerId ? { ...offer, isFavorite: status } : offer
        );
      });
  }
});

export const { changeCity } = dataProcessSlice.actions;
