import { BookmarkedTable } from "./Tables/BookmarkedTable";
import fetchDocuments from "../utils/fetch-documents";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";

export default function Bookmarked() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchDocuments("bookmarked")
      .then((books) => {
        setBooks(books);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Loader
        size="xl"
        color="teal"
        variant="bars"
        style={{ marginTop: "25%" }}
      />
    );

  if (books.length === 0) return <div>No books found</div>;

  return (
    <div>
      <BookmarkedTable data={books} />
    </div>
  );
}
