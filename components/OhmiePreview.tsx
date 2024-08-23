import React, { useState } from "react";
import NextImage from "next/image";
import { CharacterParts, SelectedCharacterParts } from "../types";
import { characterParts } from "@/data";
import { vt, londrina } from "@/constants/fonts";

interface Props {
  selectedParts: SelectedCharacterParts;
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedCharacterParts>>;
  previewRef: React.RefObject<HTMLDivElement>;
}

const OhmiePreview: React.FC<Props> = ({ selectedParts, setSelectedParts, previewRef }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const selectedPartKeys = Object.keys(selectedParts);
      if (selectedPartKeys.length === 0) return; // No selected parts

      // Download background image separately
      const backgroundImage = new Image();
      backgroundImage.crossOrigin = "anonymous";
      backgroundImage.src = selectedParts.Background.image;

      const imagePromises = selectedPartKeys.map((category) => {
        const part = selectedParts[category as keyof SelectedCharacterParts];
        if (category === "Background") {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            backgroundImage.onload = () => resolve(backgroundImage);
            backgroundImage.onerror = reject;
          });
        } else {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = part.image;
          });
        }
      });

      const images = await Promise.all(imagePromises);
      canvas.width = images[0].width;
      canvas.height = images[0].height;

      images.forEach((image) => {
        context?.drawImage(image, 0, 0);
      });

      canvas.toBlob(async (blob) => {
        if (blob) {
          if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({ files: [new File([blob], "ohmie.png", { type: "image/png" })] })
          ) {
            try {
              await navigator.share({
                files: [new File([blob], "ohmie.png", { type: "image/png" })],
              });
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
      }, "image/png");
    } catch (error) {
      console.error("Image download failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomize = () => {
    setLoading(true);

    setTimeout(() => {
      const newSelectedParts: SelectedCharacterParts = {
        Background: getRandomPart("Background"),
        Type: getRandomPart("Type"),
        Hats: getRandomPart("Hats"),
        Clothes: getRandomPart("Clothes"),
        Eyes: getRandomPart("Eyes"),
        Mouth: getRandomPart("Mouth"),
        Special: getRandomPart("Special"),
        Vr: getRandomPart("Vr"),
      };
      setSelectedParts(newSelectedParts);
      setLoading(false);
    }, 400);
  };

  const getRandomPart = (category: keyof CharacterParts) => {
    const parts = characterParts[category];
    const randomIndex = Math.floor(Math.random() * parts.length);
    return parts[randomIndex];
  };

  return (
    <div>
      <div
        className={`relative mx-auto h-[360px] w-[360px] lg:h-[380px] lg:w-[380px] xl:h-[400px] xl:w-[400px] bg-none mb-4 ${
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
      <div className={`flex gap-4 justify-center ${vt.className}`}>
        <button
          onClick={handleRandomize}
          className="flex flex-row bg-none border border-[#444444] bg-[#272727] hover:bg-[#222222] hover:text-gray-200 text-gray-200 text-lg py-2 px-5 rounded mt-4 mb-4 mx-2 shadow-md"
        >
          <p className={`my-auto text-gray-200 ${londrina.className}`}>surprise.</p>
        </button>
        <button
          onClick={handleDownload}
          className="flex flex-row bg-none border border-[#444444] bg-[#272727] hover:bg-[#222222] hover:text-gray-200 text-gray-200 text-lg py-2 px-5 rounded mt-4 mb-4 mx-2 shadow-md"
        >
          <p className={`my-auto text-gray-200 ${londrina.className}`}>download.</p>
        </button>
      </div>
    </div>
  );
};

export default OhmiePreview;
