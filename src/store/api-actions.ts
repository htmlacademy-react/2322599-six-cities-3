import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadOffers, setIsLoading } from './action';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offers';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await api.get<Offer[]>('/offers');
      dispatch(loadOffers(data));
    } catch {
      // Ошибка игнорируется по требованию
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
