export const Settings = {
  OffersCount: 312,
  City: 'Amsterdam'
} as const;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}
