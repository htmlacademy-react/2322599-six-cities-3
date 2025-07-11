import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Offer, FavoriteData } from '../types/offers';
import { toast } from 'react-toastify';
import { Review } from '../types/reviews';
import { redirectToRoute } from './redirect-action';
import { AppDispatch, State } from '../types/state';

export const updateOfferFavoriteStatus = createAction<FavoriteData>('offers/updateFavoriteStatus');

export const fetchOffers = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const changeFavoriteStatus = createAsyncThunk<void, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFavoriteStatus',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    try {
      await api.post(`${APIRoute.Favorite}/${offerId}/${status ? 1 : 0}`);
      dispatch(updateOfferFavoriteStatus({ offerId, status }));
    } catch (error) {
      toast.error('Failed to update favorite status');
    }
  },
);

export const fetchCommentsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);

export const postCommentAction = createAsyncThunk<void, { offerId: string; comment: string; rating: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    try {
      await api.post(`${APIRoute.Comments}/${offerId}`, { comment, rating });
      dispatch(fetchCommentsAction(offerId));
    } catch (error) {
      toast.error('Failed to post comment');
      throw error;
    }
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  }
);

export const fetchNearOffersAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);
