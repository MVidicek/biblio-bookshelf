import { BooksTable } from "./Tables/BooksTable";
import fetchDocuments from "../utils/fetch-documents";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import NoBooksAdded from "./NoBooksAdded";

export default function Reading({ setPage }) {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchDocuments("reading")
      .then((books) => {
        setBooks(books);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [loading]);

  if (loading)
    return <Loader size="xl" color="teal" style={{ marginTop: "25%" }} />;

  if (books.length === 0) return <NoBooksAdded setPage={setPage} />;

  return (
    <div>
      <BooksTable data={books} setLoading={setLoading} collection={"reading"} />
    </div>
  );
}
