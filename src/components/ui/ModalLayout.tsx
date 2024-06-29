import { useModalStore } from "@/src/state/modalStore";
import { Outlet } from "react-router-dom";
import ImageModal from "./ImageModal";
import { useGetPhoto } from "@/src/hooks/useGetPhoto";
import SingleImage from "@/src/pages/SinglePage";
import { Center, Spinner } from "@chakra-ui/react";

const ModalLayout = () => {
  const { photo, isLoading, error } = useGetPhoto();
  const { isOpen, closeModal } = useModalStore();

  if (error) {
    throw error;
  }

  if (isLoading)
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );

  return isOpen ? (
    <ImageModal isOpen={isOpen} selected={photo} onClose={closeModal} />
  ) : (
    <Outlet />
  );
};

export default ModalLayout;
