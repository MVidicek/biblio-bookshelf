import { useState } from 'react';
import useFetchBooks from '../hooks/useFetchBooks';
import { SimpleGrid, Pagination, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Cross1Icon } from '@radix-ui/react-icons';

import BookItem from '../components/BookItem';

export default function Discover() {
  const [pageIndex, setPageIndex] = useState(1);
  const { books, isLoading, isError } = useFetchBooks();

  console.log(books);

  if (isLoading)
    return (
      <Loader
        size='xl'
        color='teal'
        variant='bars'
        style={{ marginTop: '25%' }}
      />
    );
  if (isError)
    return showNotification({
      title: 'Error',
      message: 'Could not fetch books data',
      color: 'pink',
      icon: <Cross1Icon />,
    });

  return (
    <div>
      <SimpleGrid
        spacing='md'
        breakpoints={[
          { minWidth: 1200, cols: 1 },
          { minWidth: 1400, cols: 2 },
          { minWidth: 1800, cols: 3 },
          { minWidth: 2200, cols: 4 },
        ]}
      >
        {books.map((book) => {
          if (
            Object.hasOwn(book.volumeInfo, 'authors') &&
            Object.hasOwn(book, 'searchInfo')
          ) {
            return <BookItem key={book.id} book={book} />;
          }
        })}
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
