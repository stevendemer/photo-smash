import { useSearchParams } from "react-router-dom";
import { getPhotos, searchPhotos } from "../utils/api";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import useDebounce from "./useDebounce";
import axios from "../utils/axios";
import { PAGE_SIZE } from "../utils/constants";

export function useGetPhotos() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  console.log("Query is ", query);

  const debouncedSearchTerm = useDebounce(query, 300);

  const { data, isLoading, error, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["photos", debouncedSearchTerm],
      queryFn: async ({ pageParam = 1 }) => {
        if (debouncedSearchTerm) {
          // search for a photo
          const response = await axios.get(`search/photos`, {
            params: {
              query: debouncedSearchTerm,
              page: pageParam,
              per_page: PAGE_SIZE,
            },
          });

          console.log("Response is ", response.statusText);

          return response.data.results;
        } else {
          const response = await axios.get("photos", {
            params: {
              page: pageParam,
              per_page: PAGE_SIZE,
            },
          });
          console.log("Response is ", response.statusText);
          return response.data;
        }
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length ? allPages?.length + 1 : undefined;
      },
    });

  console.log("Photos are ", data?.pages);

  // const photos = data?.pages.flatMap((page) => page) || [];

  return {
    isLoading,
    error,
    photos: data,
    isFetching,
    fetchNextPage,
    hasNextPage,
  };
}
