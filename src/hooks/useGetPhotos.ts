import { getPhotos } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../utils/constants";

export function useGetPhotos() {
  const { data, isLoading, error, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["photos"],
      queryFn: ({ pageParam = 1 }) => getPhotos({ pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });

  return {
    photos: data,
    isLoading,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
  };
}
