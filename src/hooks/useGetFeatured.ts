import { useQuery } from "@tanstack/react-query";
import { searchPhotos } from "../utils/api";

export function useGetFeatured() {
  const query = "cars";

  const { data, isLoading, error } = useQuery({
    queryKey: ["featured", query],
    queryFn: () => searchPhotos({ query }),
  });

  return {
    photos: data,
    isLoading,
    error,
  };
}
