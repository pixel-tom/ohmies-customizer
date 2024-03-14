import React, { useRef, useState } from "react";
import NextImage from "next/image";
import { CharacterParts, SelectedCharacterParts } from "../types";
import { characterParts } from "@/data";
import DownloadIcon from '@mui/icons-material/Download';
import ShuffleIcon from '@mui/icons-material/Shuffle';

// Loading spinner component
const LoadingSpinner = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    </div>
  );
};

interface Props {
  selectedParts: SelectedCharacterParts;
  onRandomize: (newParts: SelectedCharacterParts) => void;
  previewRef: React.RefObject<HTMLDivElement>;
}

const CharacterPreview: React.FC<Props> = ({
  selectedParts,
  onRandomize,
  previewRef,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    // Simulate asynchronous download process
    setTimeout(() => {
      setLoading(false);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const selectedPartKeys = Object.keys(selectedParts);
      if (selectedPartKeys.length === 0) return; // No selected parts
    
      const imagePromises = selectedPartKeys.map((category) => {
        const part = selectedParts[category];
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.onload = () => {
            resolve(image);
          };
          image.onerror = reject;
          image.src = part.image;
        });
      });
    
      try {
        Promise.all(imagePromises).then(images => {
          canvas.width = images[0].width;
          canvas.height = images[0].height;
    
          images.forEach((image) => {
            context?.drawImage(image, 0, 0);
          });
    
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "character.png";
              link.click();
              URL.revokeObjectURL(url);
            }
          }, "image/png");
        });
      } catch (error) {
        console.error("Image download failed:", error);
      }
    }, 1000);
  };

  const handleRandomize = () => {
    setLoading(true);

    // Simulate asynchronous randomization process
    setTimeout(() => {
      setLoading(false);
      const newSelectedParts: SelectedCharacterParts = {};
      for (const category in characterParts) {
        const parts = characterParts[category as keyof CharacterParts];
        const randomIndex = Math.floor(Math.random() * parts.length);
        newSelectedParts[category as keyof CharacterParts] = parts[randomIndex];
      }
      onRandomize(newSelectedParts);
    }, 1000);
  };

  return (
    <div>
      {loading && <LoadingSpinner />} {/* Show loading spinner when loading */}
      <div
        className={`relative mx-auto h-[300px] w-[300px] md:h-78 md:h-78 lg:h-[300px] lg:w-[300px] xl:h-[320px] xl:w-[320px] bg-none rounded-sm shadow-sm mb-2 ${loading && 'opacity-30 shadow-inner'}`}
        ref={previewRef}
      >
        {Object.keys(selectedParts).map((category) => {
          const part = selectedParts[category as keyof SelectedCharacterParts];
          return (
            <NextImage
              key={category}
              src={part.image}
              alt={part.name}
              layout="fill"
              objectFit="responsive"
              quality={80}
              className="border border-1 border-black"
            />
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleRandomize}
          className="bg-none border border-[#444444] bg-[#272727] hover:bg-[#222222] hover:text-gray-200 text-gray-200 text-sm py-3 px-6 rounded mt-4 mb-4 mx-2"
        >
          <ShuffleIcon className="h-5 w-5 mr-2"/>
          RANDOMIZE
        </button>
        <button
          onClick={handleDownload}
          className="bg-none border border-[#444444] bg-[#272727] hover:bg-[#222222] hover:text-gray-200 text-gray-200 text-sm py-3 px-6 rounded mt-4 mb-4 mx-2"
        >
          <DownloadIcon className="h-5 w-5 mr-2"/>
          DOWNLOAD
        </button>
      </div>
    </div>
  );
};

export default CharacterPreview;
