import { createAction } from '@reduxjs/toolkit';
import { Offer, FavoriteData } from '../types/offers';

export const changeCity = createAction<string>('city/changeCity');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const updateOfferFavoriteStatus = createAction<FavoriteData>('offers/updateFavoriteStatus');
