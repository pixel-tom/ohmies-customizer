import React, { useRef, useState, useEffect } from "react";
import NextImage from "next/image";
import { CharacterParts, SelectedCharacterParts } from "../types";
import { characterParts } from "@/data";
import DownloadIcon from "@mui/icons-material/Download";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { VT323 } from "next/font/google";
import debounce from "lodash.debounce";

const inter = VT323({
  subsets: ["latin"],
  weight: "400",
});

interface Props {
  selectedParts: SelectedCharacterParts;
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedCharacterParts>>;
  previewRef: React.RefObject<HTMLDivElement>;
}

const OhmiePreview: React.FC<Props> = ({
  selectedParts,
  setSelectedParts,
  previewRef,
}) => {
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(new URL("../workers/imageWorker.js", import.meta.url));
    workerRef.current.onmessage = (event) => {
      setLoading(false);
      const { blob, error } = event.data;
      if (error) {
        console.error("Image processing failed:", error);
      } else if (blob) {
        const file = new File([blob], "ohmie.png", { type: "image/png" });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            navigator.share({ files: [file] });
          } catch (error) {
            console.error("Sharing failed", error);
          }
        } else {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "ohmie.png";
          link.click();
          URL.revokeObjectURL(url);
        }
      }
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleDownload = async () => {
    setLoading(true);
    workerRef.current?.postMessage({ selectedParts });
  };

  const handleRandomize = debounce(() => {
    setLoading(true);

    setTimeout(() => {
      const newSelectedParts: SelectedCharacterParts = {
        Background: getRandomPart("Background"),
        Skin: getRandomPart("Skin"),
        Outfit: getRandomPart("Outfit"),
        Head: getRandomPart("Head"),
        Special: getRandomPart("Special"),
        Mystery: getRandomPart("Mystery"),
      };
      setSelectedParts(newSelectedParts);
      setLoading(false);
    }, 100);
  }, 200);

  const getRandomPart = (category: keyof CharacterParts) => {
    const parts = characterParts[category];
    const randomIndex = Math.floor(Math.random() * parts.length);
    return parts[randomIndex];
  };

  return (
    <div>
      <div
        className={`relative mx-auto h-[320px] w-[320px] lg:h-[350px] lg:w-[350px] xl:h-[380px] xl:w-[380px] bg-none mb-2 ${
          loading && "opacity-30"
        }`}
        ref={previewRef}
      >
        {Object.keys(selectedParts)
          .filter((category) => category !== "Background")
          .map((category) => {
            const part = selectedParts[category as keyof SelectedCharacterParts];
            return (
              <NextImage
                key={category}
                src={part.image}
                alt={part.name}
                layout="fill"
                objectFit="responsive"
                quality={80}
                loading="lazy"
              />
            );
          })}
      </div>
      <canvas ref={canvasRef} className="hidden"></canvas>
      <div className={`flex gap-4 justify-center mt ${inter.className}`}>
        <button
          onClick={handleRandomize}
          className="flex flex-row bg-none border border-[#444444] bg-[#272727] hover:bg-[#222222] hover:text-gray-200 text-gray-200 text-lg py-2 px-5 rounded mt-4 mb-4 mx-2"
        >
          <ShuffleIcon className="my-auto h-5 w-5 mr-2" />
          <p className="my-auto">RANDOMIZE</p>
        </button>
        <button
          onClick={handleDownload}
          className="flex flex-row bg-none border border-[#444444] bg-[#272727] hover:bg-[#222222] hover:text-gray-200 text-gray-200 text-lg py-2 px-5 rounded mt-4 mb-4 mx-2"
        >
          <DownloadIcon className="my-auto h-5 w-5 mr-2" />
          <p className="my-auto">DOWNLOAD</p>
        </button>
      </div>
    </div>
  );
};

export default OhmiePreview;
