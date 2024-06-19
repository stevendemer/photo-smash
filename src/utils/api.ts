import axios from "./axios";

type Order = "latest" | "oldest" | "popular";

export async function getPhotos({
  page,
  order,
}: {
  page?: number;
  order?: string;
}) {
  const { data, status, statusText } = await axios.get(`photos`);

  if (status !== 200) {
    console.error(statusText);
    throw new Error("Error getting photos");
  }

  return data;
}
