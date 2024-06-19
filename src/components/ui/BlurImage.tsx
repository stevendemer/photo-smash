import { useState } from "react";
import { cn } from "@/src/utils/cn";

const BlurImage = ({ photo }: { photo: Photo }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={photo.urls.full}
      height="500"
      width="500"
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition duration-200",
        loaded ? "blur-none" : "blur-md"
      )}
      alt="thumbnail"
    />
  );
};

export default BlurImage;
