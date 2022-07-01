import { createContext } from 'react';

export const pages = {
  home: { page: 'home' },
  discover: { page: 'discover' },
  bookmarked: { page: 'bookmarked' },
  finnished: { page: 'finnished' },
  reading: { page: 'reading' },
  profile: { page: 'profile' },
  settings: { page: 'settings' },
};

export const PageContext = createContext({
  page: pages.home,
  setPage: () => {},
});
