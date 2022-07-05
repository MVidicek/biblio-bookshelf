import { useEffect } from 'react';
import Profile from '../components/Profile';
import Discover from '../components/Discover';
import Finished from '../components/Finished';
import Bookmarked from '../components/Bookmarked';
import Reading from '../components/Reading';
import { getLayout } from '../components/Layout';

export default function Home({ page, setOpened }) {
  useEffect(() => {
    setOpened(false);
  }, [page, setOpened]);

  if (page === 'profile') return <Profile />;
  if (page === 'discover') return <Discover />;
  if (page === 'finished') return <Finished />;
  if (page === 'bookmarked') return <Bookmarked />;
  if (page === 'reading') return <Reading />;

  return <div></div>;
}

Home.getLayout = getLayout;
