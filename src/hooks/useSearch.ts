import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axios";

export function useSearch(query: string) {
  const client = useQueryClient();

  const getCache = (key: string) => {
    return client.getQueryData([key]);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: [`photos`, query],
    queryFn: async (query: string) => {
      // try to access the cache
      const cache = getCache(`photos/${query}`);
      if (cache) return cache;

      const { data, status, statusText } = await axios.get(`search/photos`, {
        params: {
          query,
        },
      });

      if (status !== 200) {
        console.error(statusText);
      }

      return data;
    },
  });

  return {
    error,
    isLoading,
    data,
  };
}
