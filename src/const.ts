export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const DEFAULT_CITY = 'Paris';

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments'
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
] as const;

export type CityName = typeof CITIES[number];

export enum CommentLength {
  Min = 50,
  Max = 300,
}

export const MAX_REVIEWS_COUNT = 10;
