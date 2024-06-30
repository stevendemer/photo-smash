import { CalendarIcon, DownloadIcon } from "@chakra-ui/icons";
import SelectedCard from "./SelectedPhoto";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
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
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { formatDistanceFromNow } from "@/src/utils/helpers";
import { useGetFeatured } from "@/src/hooks/useGetFeatured";

const ImageModal = ({
  selected,
  isOpen,
  onClose,
}: {
  selected?: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  //   const { isOpen, toggleModal } = useModalStore();

  const { collections, isLoading, error } = useGetFeatured();
  const toast = useToast();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Center>
        <Spinner size="lg" />
      </Center>
    );
  }

  if (error) {
    toast({
      title: error.message,
      status: "error",
      isClosable: true,
      orientation: "horizontal",
    });
    throw error;
  }

  // console.log("Single photo is ", selected);

  console.log("Collection photos are ", collections);

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
      >
        <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.400" />
        <ModalContent
          dropShadow="inherit"
          minHeight={"80vh"}
          minW="80vw"
          backgroundColor="blackAlpha.700"
          overflowX="hidden"
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

                {/* <Avatar
                  src={selected?.user.profile_image.small}
                  alt={selected?.user?.first_name} */}
                {/* /> */}
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
                display={{ base: "none", md: "flex" }}
                align="center"
                spacing="1.2rem"
                maxW="70vw"
                overflowX="scroll"
              >
                {selected?.tags.map((tag, index) => (
                  <Tag
                    size="sm"
                    borderRadius="md"
                    colorScheme="purple"
                    variant="solid"
                    fontFamily="sans-serif"
                    textTransform={"capitalize"}
                    key={tag.title}
                    cursor="pointer"
                    w="max-content"
                    p={1}
                  >
                    {tag.title}
                  </Tag>
                ))}
              </HStack>
            </Stack>
            <Flex direction="column" mt={20} minH="80vh" maxW="60vw">
              <Heading mx={20}>Featured images</Heading>
              <Grid templateColumns="repeat(3,1fr)" gap={4}>
                {collections?.map((collection: Photo) => (
                  <GridItem m={2} key={collection.id}>
                    <Image
                      src={collection?.urls.raw}
                      alt={collection?.alt_description}
                      objectFit="contain"
                    />
                  </GridItem>
                ))}
              </Grid>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
