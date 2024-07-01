import { useQuery } from "@tanstack/react-query";
import { searchPhotos } from "../utils/api";
import { useParams } from "react-router-dom";

export function useGetFeatured() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["collections", id],
    queryFn: () => searchPhotos({ query: id }),
  });

  return {
    collections: data,
    isLoading,
    error,
  };
}
