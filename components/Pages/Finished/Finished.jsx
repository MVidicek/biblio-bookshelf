import { BooksTable } from "../../Shared/BooksTable";
import fetchDocuments from "../../../functions/helpers/fetch-documents";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import NoBooksAdded from "../../Shared/NoBooksAdded";

export default function Finished({ setPage }) {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchDocuments("finished")
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
      <BooksTable
        data={books}
        setLoading={setLoading}
        collection={"finished"}
      />
    </div>
  );
}
