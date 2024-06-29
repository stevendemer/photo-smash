import { useMemo, useCallback, useRef } from "react";
import { useGetPhotos } from "../hooks/useGetPhotos";
import { Box, Center, Container, Spinner } from "@chakra-ui/react";
import SelectedCard from "../components/ui/SelectedPhoto";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Homepage = () => {
  const { photos, error, isLoading, hasNextPage, fetchNextPage, isFetching } =
    useGetPhotos();

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const allPhotos = useMemo(() => {
    return photos?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [photos]);

  if (error) {
    console.error(error);
    throw error;
  }

  if (isLoading) {
    return (
      <Center>
        <Spinner size="lg" />;
      </Center>
    );
  }
  return (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        style={{
          maxWidth: "70vw",
          position: "relative",
          margin: "auto",
        }}
      >
        <Masonry>
          {allPhotos.map((photo, index: number) => (
            <Box overflow="hidden" m={2} key={index} ref={lastElementRef}>
              <SelectedCard isLoading={isLoading} selected={photo} />
            </Box>
          ))}
          {isFetching && <Spinner size="xl" />}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default Homepage;
