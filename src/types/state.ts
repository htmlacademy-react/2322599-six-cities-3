import { NameSpace } from '../const';
import { Offer } from './offers';
import { Review } from './reviews';
import { UserData } from './user-data';
import { AuthorizationStatus } from '../const';

export type State = {
  [NameSpace.Data]: {
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
  };
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus;
    userData: UserData | null;
  };
};

export type AppDispatch = typeof import('../store').store.dispatch;
