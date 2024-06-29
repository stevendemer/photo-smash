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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
            placeholder="Search for a photo"
            type="search"
            _placeholder={{
              color: colorMode === "dark" ? "gray.50" : "gray.700",
              opacity: 0.4,
            }}
            color={colorMode === "dark" ? "gray.50" : "gray.700"}
            borderColor="white"
          />
        </InputGroup>
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
