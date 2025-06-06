import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Settings } from './const';
import { mockOffers } from './mocks/offers';
import { mockReviews } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      settings={Settings}
      offers={mockOffers}
      reviews={mockReviews}
    />
  </React.StrictMode>
);
