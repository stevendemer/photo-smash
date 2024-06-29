import { Spinner } from "@chakra-ui/react";
import ImageModal from "../components/ui/ImageModal";
import { useGetPhoto } from "../hooks/useGetPhoto";

const SingleImage = () => {
  const { photo, isLoading, error } = useGetPhoto();

  if (error) {
    throw error;
  }

  if (isLoading) return <Spinner />;

  return <ImageModal selected={photo} />;
};

export default SinglePage;
