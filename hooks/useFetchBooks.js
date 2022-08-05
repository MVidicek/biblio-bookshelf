import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useFetchBooks(
  startIndex = 0,
  maxResults = 8,
  searchText = ""
) {
  const { data, error } = useSWR(
    `https://www.googleapis.com/books/v1/volumes?q=${searchText}&startIndex=${startIndex}&maxResults=${maxResults}&fields=items`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateIfStale: false,
    }
  );

  return {
    books: data?.items,
    isError: error,
  };
}
