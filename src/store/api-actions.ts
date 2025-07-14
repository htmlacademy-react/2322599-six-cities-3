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
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      return data;
    } catch (error) {
      toast.error('Failed to load offers');
      throw error;
    }
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      return data;
    } catch (error) {
      toast.error('Authentication check failed');
      throw error;
    }
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Root));
      toast.success('Login successful!');
      return data;
    } catch (error) {
      toast.error('Failed to login');
      throw error;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      toast.info('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
      throw error;
    }
  },
);

export const fetchFavoriteOffers = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorite);
      return data;
    } catch (error) {
      toast.error('Failed to load favorites');
      throw error;
    }
  }
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
      dispatch(fetchFavoriteOffers());
    } catch (error) {
      toast.error(status
        ? 'Failed to add to favorites'
        : 'Failed to remove from favorites'
      );
      throw error;
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
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      return data;
    } catch (error) {
      toast.error('Failed to load reviews');
      throw error;
    }
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
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch (error) {
      toast.error('Failed to load offer details');
      throw error;
    }
  }
);

export const fetchNearOffersAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers',
  async (offerId, { extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      return data;
    } catch (error) {
      toast.error('Failed to load nearby offers');
      throw error;
    }
  }
);
