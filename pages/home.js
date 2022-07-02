import { useState, useEffect } from 'react';
import { loadBooks } from '../lib/fetch-books';
import { getLayout } from '../components/Layout';
import Profile from '../components/Profile';
import Discover from '../components/Discover';
import { Transition } from '@mantine/core';

export default function Home({ page, booksDiscover }) {
  const [transitionPage, setTransitionPage] = useState('home');

  useEffect(() => {
    if (page === 'profile') {
      setTransitionPage('profile');
    } else if (page === 'discover') {
      setTransitionPage('discover');
    } else {
      setTransitionPage('home');
    }
  }, [page]);

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
  if (page === 'discover') return <Discover books={booksDiscover} />;

  return <div>{page}</div>;
}

Home.getLayout = getLayout;

export async function getServerSideProps() {
  // loadBooks gets paramters (startIndex, maxResults)
  const data = await loadBooks();

  return {
    props: { booksDiscover: data.items },
  };
}
