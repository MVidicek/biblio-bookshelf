import useSWR from "swr";

const useGlobalState = (key, initialData) => {
  const { data, mutate } = useSWR(key, () => initialData, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateIfStale: false,
  });
  return [
    data ?? initialData,
    (value) =>
      mutate(value, {
        revalidate: false,
      }),
  ];
};

export default useGlobalState;
