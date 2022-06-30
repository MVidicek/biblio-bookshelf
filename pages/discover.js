import { getLayout } from '../components/Layout';
import { Stack } from '@mantine/core';
import BookItem from '../components/BookItem';
import { loadBooks } from '../lib/fetch-books';

export default function Discover({ books }) {
  console.log(books);
  return (
    <Stack>
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </Stack>
  );
}

Discover.getLayout = getLayout;

export async function getStaticProps() {
  const data = await loadBooks();

  return {
    props: { books: data.items },
  };
}
