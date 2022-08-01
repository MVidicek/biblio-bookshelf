import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useFetchBooks(startIndex = 0, maxResults = 8) {
  const { data, error } = useSWR(
    `https://www.googleapis.com/books/v1/volumes?q=Hobbit&startIndex=${startIndex}&maxResults=${maxResults}&fields=items`,
    fetcher
  );

  return {
    books: data?.items,
    isLoading: !error && !data,
    isError: error,
  };
}
