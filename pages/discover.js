import { useState } from 'react';
import { getLayout } from '../components/Layout';
import { SimpleGrid, Pagination } from '@mantine/core';
import BookItem from '../components/BookItem';
import { loadBooks } from '../lib/fetch-books';

export default function Discover({ books }) {
  const [pageIndex, setPageIndex] = useState(1);
  console.log(books);

  return (
    <div>
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
      <Pagination
        page={pageIndex}
        onChange={setPageIndex}
        mt='1rem'
        total={5}
        color='teal'
        position='center'
        radius='sm'
      />
    </div>
  );
}

Discover.getLayout = getLayout;

export async function getServerSideProps() {
  // loadBooks gets paramters (startIndex, maxResults)
  const data = await loadBooks();

  return {
    props: { books: data.items },
  };
}
