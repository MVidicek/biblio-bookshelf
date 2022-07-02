import { useEffect } from 'react';
import { loadBooks } from '../lib/fetch-books';
import { getLayout } from '../components/Layout';
import Profile from '../components/Profile';
import Discover from '../components/Discover';

export default function Home({ page, setOpened, booksDiscover }) {
  useEffect(() => {
    setOpened(false);
  }, [setOpened]);

  if (page === 'profile') return <Profile />;
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
