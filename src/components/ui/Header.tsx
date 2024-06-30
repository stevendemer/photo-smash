import {
  Image,
  Flex,
  Input,
  InputGroup,
  Switch,
  useColorMode,
  InputLeftElement,
  Text,
  Heading,
  Show,
  Hide,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import MobileMenu from "./MobileMenu";
import { useSearch } from "@/src/hooks/useSearch";
import { FormEvent, useState } from "react";
import useDebounce from "@/src/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { useSearchParams } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  // const { isLoading, error, data } = useSearch(query);
  const toast = useToast();

  const [searchParams, setSearchParams] = useSearchParams();

  // const debouncedSearchTerm = useDebounce(query, 400);

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["search", query],
  //   queryFn: async () => {
  //     if (debouncedSearchTerm) {
  //       const data = await axios.get(`search/photos`, {
  //         params: {
  //           query,
  //         },
  //       });
  //       return data.data;
  //     } else {
  //       const data = await axios.get("photos");
  //       return data.data;
  //     }
  //   },
  // });

  // console.log("Search is ", data);

  // if (isLoading) {
  //   return (
  //     <Center>
  //       <Spinner size="lg" />
  //     </Center>
  //   );
  // }

  // if (error) {
  //   throw error;
  // }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) {
      toast({
        title: "Query is missing",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      return;
    }

    setSearchParams({ query });
  };

  return (
    <Flex
      align="center"
      justify="space-around"
      w="100%"
      textColor={"gray.50"}
      borderBottom="1px solid white"
      px={10}
      py={4}
      mb={20}
    >
      <Flex cursor="pointer" order={2} justify="flex-end" mx={5}>
        <Switch
          onChange={() => toggleColorMode()}
          size="md"
          colorScheme="green"
        />
      </Flex>
      <Flex align="center">
        <form onSubmit={onSubmit}>
          <InputGroup>
            <InputLeftElement pointerEvents="auto">
              <SearchIcon
                mt={2}
                color={colorMode === "dark" ? "gray.100" : "gray.800"}
              />
            </InputLeftElement>
            <Input
              width="auto"
              htmlSize={20}
              size="lg"
              placeholder="Search..."
              type="search"
              _placeholder={{
                color: colorMode === "dark" ? "gray.50" : "gray.700",
                opacity: 0.4,
              }}
              color={colorMode === "dark" ? "gray.50" : "gray.700"}
              borderColor="white"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
          </InputGroup>
        </form>
      </Flex>
      <MobileMenu />
      <Flex
        display={{
          base: "none",
          md: "flex",
        }}
        align="center"
      >
        <Text
          bgGradient="linear(to-tl, purple.300 30%, orange.400 40%)"
          bgClip="text"
          fontSize={{ base: "0px", md: "2rem", lg: "3rem" }}
          mx={4}
          fontFamily="Inter"
          fontWeight={200}
        >
          Photo Smash
        </Text>
        <Image
          boxSize="5rem"
          objectFit="cover"
          alt="Photo Smash"
          src="/_logo.png"
          cursor="pointer"
          borderRadius="full"
        />
      </Flex>
    </Flex>
  );
};

export default Header;
