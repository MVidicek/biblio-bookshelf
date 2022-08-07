import { useState, useEffect } from "react";
import useFetchBooks from "../hooks/useFetchBooks";
import useGlobalState from "../hooks/useGlobalState";
import { SimpleGrid, Pagination, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Cross1Icon } from "@radix-ui/react-icons";
import BookItem from "../components/BookItem";

export default function Discover() {
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchText] = useGlobalState("search", "");

  const { books, isError } = useFetchBooks((pageIndex - 1) * 8, 8, searchText);

  useEffect(() => {
    if (books) {
      setLoading(false);
    }
    console.log(books);
  }, [books]);

  if (loading)
    return (
      <Loader
        size="xl"
        color="teal"
        variant="bars"
        style={{ marginTop: "25%" }}
      />
    );
  if (isError)
    return showNotification({
      title: "Error",
      message: "Could not fetch books data",
      color: "pink",
      icon: <Cross1Icon />,
    });
  if (books === null || books === undefined)
    return (
      <Loader
        size="xl"
        color="teal"
        variant="bars"
        style={{ marginTop: "25%" }}
      />
    );

  return (
    <div>
      <SimpleGrid
        spacing="xl"
        breakpoints={[
          { minWidth: 1200, cols: 1 },
          { minWidth: 1400, cols: 2 },
          { minWidth: 1800, cols: 3 },
          { minWidth: 2200, cols: 4 },
        ]}
      >
        {books.map((book) => {
          if (Object.hasOwn(book.volumeInfo, "authors")) {
            return <BookItem key={book.id} book={book} />;
          }
        })}
      </SimpleGrid>
      <Pagination
        page={pageIndex}
        onChange={setPageIndex}
        mt="5rem"
        total={5}
        color="teal"
        position="center"
        radius="sm"
      />
    </div>
  );
}
