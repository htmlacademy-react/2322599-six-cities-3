import { createAction } from '@reduxjs/toolkit';
import { Offer, FavoriteData } from '../types/offers';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';

export const changeCity = createAction<string>('city/changeCity');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const updateOfferFavoriteStatus = createAction<FavoriteData>('offers/updateFavoriteStatus');
export const setIsLoading = createAction<boolean>('app/setIsLoading');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('app/setError');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setUserData = createAction<UserData | null>('user/setUserData');
