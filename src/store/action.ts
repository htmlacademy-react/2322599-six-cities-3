import { createAction } from '@reduxjs/toolkit';
import { Offer, FavoriteData } from '../types/offers';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';
import { Review } from '../types/reviews';

export const changeCity = createAction<string>('city/changeCity');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const updateOfferFavoriteStatus = createAction<FavoriteData>('offers/updateFavoriteStatus');
export const setIsLoading = createAction<boolean>('app/setIsLoading');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setUserData = createAction<UserData | null>('user/setUserData');
export const setComments = createAction<Review[]>('data/setComments');
export const setCommentsLoadingStatus = createAction<boolean>('data/setCommentsLoadingStatus');
export const setCurrentOffer = createAction<Offer | null>('data/setCurrentOffer');
export const setNearOffers = createAction<Offer[]>('data/setNearOffers');
export const setOfferLoadingStatus = createAction<boolean>('data/setOfferLoadingStatus');
