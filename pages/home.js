import { useState, useEffect } from 'react';
import { loadBooks } from '../lib/fetch-books';
import { getLayout } from '../components/Layout';
import Profile from '../components/Profile';
import Discover from '../components/Discover';
import { Transition } from '@mantine/core';

const scaleY = {
  in: { opacity: 1, transform: 'scaleX(1)' },
  out: { opacity: 0, transform: 'scaleX(0)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity',
};

export default function Home({ page, setOpened, booksDiscover }) {
  const [transitionPage, setTransitionPage] = useState('home');

  useEffect(() => {
    setOpened(false);
    setTimeout(() => {
      if (page === 'profile') {
        setTransitionPage('profile');
      } else if (page === 'discover') {
        setTransitionPage('discover');
      } else {
        setTransitionPage('home');
      }
    }, 400);
  }, [page, setOpened]);

  if (page === 'profile')
    return (
      <Transition
        mounted={transitionPage === 'profile'}
        transition='slide-right'
        duration={200}
        timingFunction='ease'
      >
        {(styles) => (
          <div style={styles}>
            <Profile />
          </div>
        )}
      </Transition>
    );
  if (page === 'discover')
    return (
      <Transition
        mounted={transitionPage === 'discover'}
        transition='slide-right'
        duration={200}
        timingFunction='ease'
      >
        {(styles) => (
          <div style={styles}>
            <Discover books={booksDiscover} />
          </div>
        )}
      </Transition>
    );

  return <div></div>;
}

Home.getLayout = getLayout;

export async function getServerSideProps() {
  // loadBooks gets paramters (startIndex, maxResults)
  const data = await loadBooks();

  return {
    props: { booksDiscover: data.items },
  };
}
