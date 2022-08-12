import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useFetchBooks(
  startIndex = 0,
  maxResults = 8,
  searchText = ""
) {
  let shouldFetch = searchText.length > 0;
  const { data, error } = useSWR(
    shouldFetch
      ? `https://www.googleapis.com/books/v1/volumes?q=${searchText}&startIndex=${startIndex}&maxResults=${maxResults}&fields=items`
      : null,
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
