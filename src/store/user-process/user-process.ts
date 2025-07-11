import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user-data';
import { NameSpace } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

type UserProcessState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

const initialState: UserProcessState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userProcessSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      });
  }
});
