import { CalendarIcon, DownloadIcon } from "@chakra-ui/icons";
import { useModalStore } from "@/src/state/modalStore";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Avatar,
  Tag,
  Image,
  ModalContent,
  Container,
  Flex,
  IconButton,
  TagLeftIcon,
  HStack,
  Stack,
  Stat,
  StatLabel,
  StatGroup,
  StatNumber,
  Heading,
  Center,
  Spinner,
  useToast,
  Box,
  useOutsideClick,
  useColorMode,
} from "@chakra-ui/react";
import { formatDistanceFromNow } from "@/src/utils/helpers";
import { useGetFeatured } from "@/src/hooks/useGetFeatured";
import { useRef } from "react";

const ImageModal = ({
  selected,
  isOpen,
  onClose,
}: {
  selected?: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { colorMode } = useColorMode();
  const { collections, isLoading, error } = useGetFeatured();
  const toast = useToast();
  const { openModal, closeModal } = useModalStore();

  const navigate = useNavigate();

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: () => {
      closeModal();
      navigate(-1);
    },
  });

  // if (isLoading) {
  //   return (
  //     <Center>
  //       <Spinner size="lg" thickness="0.5" emptyColor="gray" />
  //     </Center>
  //   );
  // }

  if (error) {
    toast({
      title: error.message,
      status: "error",
      isClosable: true,
      orientation: "horizontal",
    });
    throw error;
  }

  console.log("Collections are ", selected);

  return (
    <>
      <Modal
        motionPreset="slideInTop"
        size={"sm"}
        isCentered
        isOpen={isOpen}
        scrollBehavior="outside"
        onClose={() => {
          closeModal();
          navigate(-1);
        }}
      >
        <ModalOverlay
          backdropFilter="blur(8px)"
          bg={colorMode === "dark" ? "blackAlpha.400" : "whiteAlpha.400"}
        />
        <ModalContent
          dropShadow="inherit"
          minHeight={"80vh"}
          minW="80vw"
          backgroundColor="blackAlpha.700"
          bg={colorMode === "dark" ? "blackAlpha.700" : "whiteAlpha.700"}
          overflowX="hidden"
        >
          <ModalHeader>
            <Flex
              align="center"
              justify="space-between"
              mx={6}
              borderBottom="1px solid"
              borderBottomColor={colorMode === "dark" ? "white" : "black"}
            >
              <Flex align="center" m={2}>
                <Text
                  fontSize={{ base: "0.9rem", md: "1.2rem", lg: "1.7rem" }}
                  mx={4}
                  order={2}
                  color={colorMode === "dark" ? "gray.100" : "black"}
                >
                  {selected?.user.username}
                </Text>

                <Avatar
                  src={selected?.user.profile_image.small}
                  alt={selected?.user?.first_name}
                />
              </Flex>
            </Flex>
          </ModalHeader>
          <ModalCloseButton
            onClick={() => {
              onClose();
              navigate(-1);
            }}
          />
          <ModalBody ref={ref}>
            <Container centerContent maxW={"container.lg"}>
              <Image
                objectFit="contain"
                src={selected?.urls.regular}
                display="block"
                maxH={"90vh"}
                borderRadius="md"
              />
            </Container>
            <Stack
              w="100vw"
              spacing="3rem"
              justify="flex-start"
              align="flex-start"
              color={colorMode === "dark" ? "gray.50" : "black"}
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
                display={{ base: "none", md: "flex" }}
                align="center"
                spacing="4"
                maxW="40vw"
                overflowX="auto"
                my={5}
                flexWrap="nowrap"
                zIndex="sticky"
                top={0}
                height="50px"
                css={{
                  WebkitOverflowScrolling: "touch",
                  msOverflowStyle: "-ms-autohiding-scrollbar",
                }}
                sx={{
                  scrollbarWidth: "none",
                  "::webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {selected?.tags.map((tag, index) => (
                  <Tag
                    as="nav"
                    flexShrink="0"
                    size="md"
                    borderRadius="md"
                    colorScheme="purple"
                    variant="solid"
                    fontFamily="sans-serif"
                    textTransform={"capitalize"}
                    key={tag.title}
                    cursor="pointer"
                    w="max-content"
                    p={2}
                  >
                    {tag.title}
                  </Tag>
                ))}
              </HStack>
            </Stack>
            <Flex direction="column" mt={28} minH="80vh" maxW="60vw">
              <Heading mx={5}>Featured images</Heading>
              <Box
                sx={{ columnCount: [1, 2, 3], gap: "2rem" }}
                w="100%"
                p={4}
                mx="auto"
                overflow="hidden"
              >
                {collections?.map((collection: Photo) => (
                  <Box
                    onClick={() => {
                      openModal();
                      navigate(`${collection?.slug}`);
                    }}
                    overflow="hidden"
                    m={2}
                    key={collection?.id}
                  >
                    <Image
                      filter="auto"
                      cursor="zoom-in"
                      key={collection.id}
                      display="inline-block"
                      src={collection?.urls?.raw}
                      alt={collection?.alt_description}
                      objectFit="cover"
                      w="100%"
                      transition="transform 0.7s, filter 0.7s"
                      _hover={{ transform: "scale(1.10)", brightness: "50%" }}
                    />
                  </Box>
                ))}
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
