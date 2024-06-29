import { useState } from "react";
import { cn } from "@/src/utils/cn";

const BlurImage = ({ photo }: { photo: Photo }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={photo.urls.raw}
      height={photo.height}
      width={photo.width}
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-cover object-center absolute inset-0 h-full w-full ",
        loaded ? "blur-none" : "blur-md"
      )}
      alt="thumbnail"
    />
  );
};

export default BlurImage;
