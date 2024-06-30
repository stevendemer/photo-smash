import axios from "./axios";
import { PAGE_SIZE } from "./constants";

type Order = "latest" | "oldest" | "popular";

export async function getPhotos({
  pageParam = 1,
  order,
}: {
  pageParam?: number;
  order?: string;
}) {
  const resp = await axios.get(`photos`, {
    params: {
      page: pageParam,
      per_page: PAGE_SIZE,
    },
  });

  return resp.data;
}

export async function getPhoto({ id }: { id?: string }) {
  const resp = await axios.get(`photos/${id}`);

  return resp.data;
}

export async function searchPhotos({
  query,
  pageParam = 1,
}: {
  query?: string;
  pageParam?: number;
}) {
  const { data } = await axios.get(`search/photos`, {
    params: {
      query: query,
      page: pageParam ?? 1,
      per_page: PAGE_SIZE,
    },
  });

  return data;
}
