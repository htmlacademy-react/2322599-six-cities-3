import { createAction } from '@reduxjs/toolkit';
import type { Offer, FavoriteData } from '../types/offers';

export const changeCity = createAction<string>('city/changeCity');
export const fillOffers = createAction<Offer[]>('offers/fillOffers');
export const updateOfferFavoriteStatus = createAction<FavoriteData>('offers/updateFavoriteStatus');
