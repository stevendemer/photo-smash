import GridLayout from "../components/ui/grid-layout";
import { useGetPhotos } from "../hooks/useGetPhotos";

const Homepage = () => {
  const { photos, error, isLoading } = useGetPhotos();

  if (error) {
    console.error(error);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("Photos are : ", photos);

  if (photos) {
    return (
      <div className="bg-black h-screen w-full">
        <GridLayout photos={photos} />
      </div>
    );
  }
};

export default Homepage;
