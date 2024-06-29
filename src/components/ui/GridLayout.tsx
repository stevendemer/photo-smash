import { cn } from "@/src/utils/cn";
import {
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import SelectedCard from "./SelectedPhoto";
import BlurImage from "./BlurImage";

const GridLayout = ({ photos }: { photos: Photo[] }) => {
  const [selected, setSelected] = useState<Photo | null>(null);
  const [lastSelected, setLastSelected] = useState<Photo | null>(null);

  const handleClick = (item: Photo) => {
    setLastSelected(selected);
    setSelected(item);
  };

  const handleClickOutside = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.code === "Escape") {
      setLastSelected(selected);
      setSelected(null);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="w-full h-full p-16 grid grid-cols-1 md:grid-cols-3 gap-4 relative transition-all duration-200">
      {photos.map((photo) => (
        <div key={photo.id} className="cursor-pointer">
          <motion.div
            onClick={() => handleClick(photo)}
            className={cn(
              photo.classname,
              "relative overflow-hidden",
              selected?.id === photo.id
                ? "rounded-lg cursor-pointer absolute inset-0 h-full w-full md:w-1/2 m-auto z-50 flex justify-center flex-wrap flex-col "
                : lastSelected?.id === photo.id
                ? "z-40 bg-white rounded-xl h-full w-full"
                : "bg-white rounded-xl h-full w-full"
            )}
          >
            {selected?.id === photo.id && <SelectedCard selected={selected} />}
            <BlurImage photo={photo} />
          </motion.div>
        </div>
      ))}
      <motion.div
        animate={{ opacity: selected?.id ? 0.4 : 0 }}
        onClick={handleClickOutside}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
      />
    </div>
  );
};

export default GridLayout;
