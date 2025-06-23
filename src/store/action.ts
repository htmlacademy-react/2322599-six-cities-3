import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../types/offers';

export const changeCity = createAction<string>('city/changeCity');
export const fillOffers = createAction<Offer[]>('offers/fillOffers');
