import { getLayout } from '../components/Layout';
import { SimpleGrid } from '@mantine/core';
import BookItem from '../components/BookItem';
import { loadBooks } from '../lib/fetch-books';

export default function Discover({ books }) {
  console.log(books);
  return (
    <SimpleGrid
      spacing='xs'
      breakpoints={[
        { minWidth: 1200, cols: 1 },
        { minWidth: 1400, cols: 2 },
        { minWidth: 1800, cols: 3 },
        { minWidth: 2200, cols: 4 },
      ]}
    >
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </SimpleGrid>
  );
}

Discover.getLayout = getLayout;

export async function getStaticProps() {
  const data = await loadBooks();

  return {
    props: { books: data.items },
  };
}
