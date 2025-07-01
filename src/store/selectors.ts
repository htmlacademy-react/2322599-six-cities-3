import { State } from './reducer';

export const getCurrentCityName = (state: State) => state.currentCityName;
export const getOffers = (state: State) => state.offers;
export const getIsLoading = (state: State) => state.isLoading;

export const getCurrentCityOffers = (state: State) => {
  const currentCityName = getCurrentCityName(state);
  const offers = getOffers(state);

  return offers.filter((offer) => offer.city.name === currentCityName);
};
