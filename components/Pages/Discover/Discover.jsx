import { useState, useEffect } from "react";
import useFetchBooks from "../../../functions/hooks/useFetchBooks";
import useGlobalState from "../../../functions/hooks/useGlobalState";
import { SimpleGrid, Pagination, Container } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Cross1Icon } from "@radix-ui/react-icons";
import BookItem from "./BookItem";
import Lottie from "lottie-react";
import searchAnimation from "../../../assets/Lottie/search.json";

export default function Discover() {
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchText] = useGlobalState("search", "");

  const { books, isError } = useFetchBooks(
    (pageIndex - 1) * 10,
    10,
    searchText
  );

  useEffect(() => {
    if (books) {
      setLoading(false);
    }
    console.log(books);
  }, [books]);

  if (loading || books === null || books === undefined)
    return (
      <Container>
        <Lottie
          style={{ height: "35vh", marginTop: "20vh" }}
          animationData={searchAnimation}
        />
      </Container>
    );
  if (isError)
    return showNotification({
      title: "Error",
      message: "Could not fetch books data",
      color: "pink",
      icon: <Cross1Icon />,
    });

  return (
    <div style={{ width: "-webkit-fill-available" }}>
      <SimpleGrid
        spacing="xl"
        breakpoints={[
          { minWidth: 0, cols: 1 },
          { minWidth: 1050, cols: 2 },
          { minWidth: 1450, cols: 3 },
          { minWidth: 1750, cols: 4 },
          { minWidth: 2150, cols: 5 },
        ]}
        style={{ marginTop: "1rem" }}
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
        mt="3rem"
        total={4}
        color="teal"
        position="center"
        radius="sm"
      />
    </div>
  );
}
