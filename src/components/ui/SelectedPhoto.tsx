import {
  Box,
  Center,
  Container,
  Text,
  Image,
  Avatar,
  AvatarGroup,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Blurhash } from "react-blurhash";
import { DownloadIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ImageModal from "./ImageModal";
import { useModalStore } from "@/src/state/modalStore";

const SelectedCard = ({
  selected,
  isLoading,
}: {
  selected?: Photo | null;
  isLoading: boolean;
}) => {
  const [inside, setInside] = useState(false);
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  console.log("Selected photo is ", selected);

  if (isLoading) {
    return (
      <Blurhash
        hash={selected?.blur_hash || ""}
        resolutionX={32}
        resolutionY={32}
        punch={1}
      />
    );
  }

  return (
    <Box
      position="relative"
      borderRadius="lg"
      onClick={() => {
        openModal();
        navigate(`${selected?.slug}`);
      }}
    >
      <Image
        src={selected?.urls?.regular}
        objectFit="cover"
        mb={2}
        display="block"
        cursor="zoom-in"
        filter="auto"
        transition="transform 0.5s, filter 0.5s"
        _hover={{ transform: "scale(1.05)", brightness: "50%" }}
      />
      <Flex
        position="absolute"
        bottom={10}
        left={10}
        display={inside ? "flex" : "none"}
        align="center"
        transition="all 1s"
      >
        <Text
          fontSize={{ base: "0.7rem", md: "1.1rem", lg: "1.7rem" }}
          mx={4}
          order={2}
        >
          {selected?.user.username}
        </Text>
        <Avatar
          src={selected?.user.profile_image.small}
          alt={selected?.username}
        />
        <IconButton
          order={3}
          aria-label="Download image"
          icon={<DownloadIcon />}
          alignContent={"flex-end"}
          size="lg"
        />
      </Flex>
      {/* <ImageModal
        selected={selected}
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
      /> */}
    </Box>
  );
};

export default SelectedCard;
