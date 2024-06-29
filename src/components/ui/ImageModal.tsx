import { CalendarIcon, DownloadIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Tag,
  Image,
  ModalContent,
  Container,
  Avatar,
  Flex,
  IconButton,
  TagLeftIcon,
  HStack,
  Stack,
  Stat,
  StatLabel,
  StatGroup,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { useRef } from "react";
import { formatDistanceFromNow } from "@/src/utils/helpers";

const ImageModal = ({
  selected,
  isOpen,
  onClose,
}: {
  selected: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  //   const { isOpen, toggleModal } = useModalStore();

  const btnRef = useRef(null);
  const navigate = useNavigate();

  console.log("Single photo is ", selected);

  return (
    <>
      <Modal
        motionPreset="slideInTop"
        size={"sm"}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate(-1);
        }}
        isCentered
        scrollBehavior="outside"
        finalFocusRef={btnRef}
      >
        <ModalOverlay backdropFilter="blur(8px)" bg="whiteAlpha.100" />
        <ModalContent
          dropShadow="inherit"
          minHeight={"80vh"}
          minW="80vw"
          backgroundColor="blackAlpha.700"
        >
          <ModalHeader>
            <Flex
              align="center"
              justify="space-between"
              mx={6}
              borderBottom="1px solid white"
            >
              <Flex align="center" m={2}>
                <Text
                  fontSize={{ base: "0.9rem", md: "1.2rem", lg: "1.7rem" }}
                  mx={4}
                  order={2}
                >
                  {selected?.user.username}
                </Text>

                <Avatar
                  src={selected.user?.profile_image.small}
                  alt={selected.user?.first_name}
                />
              </Flex>
              <HStack spacing="12px" align="center" mx={4}>
                <IconButton
                  icon={<DownloadIcon />}
                  aria-label="Download image"
                />
                <IconButton icon={<TagLeftIcon />} aria-label="Like image" />
              </HStack>
            </Flex>
          </ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <Container centerContent maxW={"container.lg"}>
              <Image
                objectFit="contain"
                src={selected?.urls.regular}
                display="block"
                maxH={"90vh"}
                borderRadius="md"
              />
            </Container>
          </ModalBody>
          <ModalFooter>
            <Stack
              w="100vw"
              spacing="3rem"
              justify="flex-start"
              align="flex-start"
            >
              <StatGroup>
                <Stat mx={4} size="md">
                  <StatLabel>Views</StatLabel>
                  <StatNumber>
                    {selected?.views.toLocaleString(navigator.language, {
                      minimumFractionDigits: 0,
                    })}
                  </StatNumber>
                </Stat>
                <Stat size="md">
                  <StatLabel>Downloads</StatLabel>
                  <StatNumber>
                    {selected?.downloads.toLocaleString(navigator.language, {
                      minimumFractionDigits: 0,
                    })}
                  </StatNumber>
                </Stat>
              </StatGroup>
              <Flex align="center" as="b">
                <IconButton
                  mx={2}
                  icon={<CalendarIcon />}
                  aria-label="Days that passed since publication"
                  variant="ghost"
                />
                Published {formatDistanceFromNow(selected?.created_at)}
              </Flex>
              <HStack
                textOverflow="ellipsis"
                display={{ base: "none", md: "flex" }}
                align="center"
                spacing="12px"
              >
                {selected?.tags.map((tag, index) => (
                  <Tag
                    size="md"
                    borderRadius="md"
                    colorScheme="purple"
                    variant="solid"
                    fontFamily="fantasy"
                    px={2}
                    textTransform={"capitalize"}
                    key={tag.title}
                    cursor="pointer"
                  >
                    {tag.title}
                  </Tag>
                ))}
              </HStack>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
