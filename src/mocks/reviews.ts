export type Review = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

export const mockReviews: Review[] = [
  {
    id: '1',
    date: '2019-04-24',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    rating: 4
  },
  {
    id: '2',
    date: '2020-03-15',
    user: {
      name: 'Oliver',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    comment: 'Great location, clean apartment, friendly host. Would definitely stay here again!',
    rating: 5
  },
  {
    id: '3',
    date: '2021-06-20',
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    comment: 'The apartment was exactly as described. Very comfortable and had everything we needed for our stay.',
    rating: 4
  },
  {
    id: '4',
    date: '2022-01-05',
    user: {
      name: 'Alex',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment: 'Nice place but the wifi was a bit slow. Otherwise everything was perfect.',
    rating: 3
  },
  {
    id: '5',
    date: '2022-05-12',
    user: {
      name: 'Sophia',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    comment: 'Absolutely loved our stay! The apartment was beautiful and the location was perfect for exploring the city.',
    rating: 5
  }
];
