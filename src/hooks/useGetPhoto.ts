import { getPhoto } from "../utils/api";
import { useParams, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export function useGetPhoto() {
  const client = useQueryClient();

  const { id } = useParams();

  //   const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isLoading, error } = useQuery({
    queryKey: ["photo", id],
    queryFn: () => getPhoto({ id }),
  });

  //   const pageSize = Math.ceil(data.pages?.length / PAGE_SIZE);

  //   if (page < pageSize) {
  //     client.prefetchInfiniteQuery({
  //       queryKey: ["photos", page + 1, order],
  //       queryFn: () => getPhotos({ page: page + 1, order }),
  //       initialPageParam: 1,
  //       pages: 3,
  //       getNextPageParam: (lastPage, pages) => {
  //         // check if more pages to fetch based on the lastpage
  //         return lastPage.length === PAGE_SIZE ? pages.length + 1 : undefined;
  //       },
  //     });
  //   }

  //   if (page > 1) {
  //     client.prefetchInfiniteQuery({
  //       queryKey: ["photos", page - 1, order],
  //       queryFn: () => getPhotos({ page: page - 1, order }),
  //       initialPageParam: 1,
  //       pages: 3,
  //       getNextPageParam: (lastPage, pages) => {
  //         // check if more pages to fetch based on the lastpage
  //         return lastPage.length === PAGE_SIZE ? pages.length - 1 : undefined;
  //       },
  //     });
  //   }

  return {
    photo: data,
    isLoading,
    error,
  };
}
