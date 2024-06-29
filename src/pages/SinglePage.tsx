import { Center, Spinner, Text } from "@chakra-ui/react";
import { useGetPhoto } from "../hooks/useGetPhoto";
import { useModalStore } from "../state/modalStore";
import { useNavigate } from "react-router-dom";

const SingleImage = () => {
  const { photo, isLoading, error } = useGetPhoto();
  const { isOpen, closeModal } = useModalStore();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <Center>
        <Spinner size="lg" />
      </Center>
    );

  if (error) {
    throw error;
  }

  return <></>;
};

export default SingleImage;
