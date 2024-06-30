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
    // handle duplicates
    const seen = new Set();

    return photos?.pages.reduce((acc, page) => {
      page.forEach((item) => {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          acc.push(item);
        }
      });

      return [...acc];
    }, []);
  }, [photos?.pages]);

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

  console.log("Photo results are ", photos);

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
          {allPhotos?.map((photo) => (
            <Box overflow="hidden" m={2} key={photo.id} ref={lastElementRef}>
              <SelectedCard isLoading={isLoading} selected={photo} />
            </Box>
          ))}
          {isFetching && (
            <Center>
              <Spinner size="xl" />
            </Center>
          )}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default Homepage;
