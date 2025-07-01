import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadOffers } from './action';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offers';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: apiInstance }) => {
    const { data } = await apiInstance.get<Offer[]>('/offers');
    dispatch(loadOffers(data));
  }
);
