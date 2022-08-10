import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useFetchBookById(bookId = "") {
  const { data, error } = useSWR(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateIfStale: false,
    }
  );

  return {
    book: data?.items,
    isError: error,
  };
}
