import { useState, useEffect } from "react";
import useFetchBooks from "../../hooks/useFetchBooks";
import useGlobalState from "../../hooks/useGlobalState";
import { SimpleGrid, Pagination, Loader, Container } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Cross1Icon } from "@radix-ui/react-icons";
import BookItem from "./BookItem";
import Lottie from "lottie-react";
import searchAnimation from "../../assets/Lottie/search.json";

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

  if (books === null || books === undefined)
    return (
      <Container>
        <Lottie style={{ width: "100%" }} animationData={searchAnimation} />
      </Container>
    );

  if (loading)
    return <Loader size="xl" color="teal" style={{ marginTop: "25%" }} />;
  if (isError)
    return showNotification({
      title: "Error",
      message: "Could not fetch books data",
      color: "pink",
      icon: <Cross1Icon />,
    });

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
