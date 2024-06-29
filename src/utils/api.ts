import axios from "./axios";
import { PAGE_SIZE } from "./constants";

type Order = "latest" | "oldest" | "popular";

export async function getPhotos({
  pageParam,
  order,
}: {
  pageParam?: number;
  order?: string;
}) {
  const { data, status, statusText } = await axios.get(
    `photos?page=${pageParam}&per_page=${PAGE_SIZE}`
  );

  if (status !== 200) {
    console.error(statusText);
    throw new Error("Error getting photos");
  }

  return data;
}

export async function getPhoto({ id }: { id?: string }) {
  const { data, status, statusText } = await axios.get(`photos/${id}`);

  if (status !== 200) {
    console.error(statusText);
    throw new Error("Error getting photo statistics");
  }

  return data;
}
