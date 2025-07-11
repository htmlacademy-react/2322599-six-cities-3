import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: State) => state[NameSpace.User].userData;
export const getAuthCheckedStatus = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
