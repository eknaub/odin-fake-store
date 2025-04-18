import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export function useFetch<T>(
  queryKey: string[],
  url: string,
  options?: UseQueryOptions<T, Error>
): UseQueryResult<T, Error> {
  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    },
    staleTime: Infinity,
    ...options,
  });
}
