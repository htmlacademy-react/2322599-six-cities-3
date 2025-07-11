import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataProcessSlice } from './data-process/data-process';
import { userProcessSlice } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcessSlice.reducer,
  [NameSpace.User]: userProcessSlice.reducer,
});
