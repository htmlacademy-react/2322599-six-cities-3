import { store } from '../store';
export type { State } from '../store/reducer';

export type AppDispatch = typeof store.dispatch;
