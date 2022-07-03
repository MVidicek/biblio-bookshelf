import { useEffect, useState } from 'react';
import { getLayout } from '../components/Layout';
import Profile from '../components/Profile';
import Discover from '../components/Discover';

export default function Home({ page, setOpened }) {
  useEffect(() => {
    setOpened(false);
  }, [page, setOpened]);

  if (page === 'profile') return <Profile />;
  if (page === 'discover') return <Discover />;

  return <div>{page}</div>;
}

Home.getLayout = getLayout;
