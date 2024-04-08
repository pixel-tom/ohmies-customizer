import type { NextPage } from "next";
import { useState, useRef } from "react";
import { characterParts } from "../data";
import OhmiePreview from "../components/OhmiePreview";
import {
  CharacterParts,
  CharacterPart as CharacterPartType,
  SelectedCharacterParts,
} from "../types";

import { VT323 } from "next/font/google";
import OhmieTraitSelector from "../components/OhmieTraitSelector";

const inter = VT323({
  subsets: ["latin"],
  weight: "400",
});

const Home: NextPage = () => {
  const [selectedParts, setSelectedParts] = useState<SelectedCharacterParts>({
    Background: characterParts.Background[0],
    Skin: characterParts.Skin[0],
    Outfit: characterParts.Outfit[0],
    Head: characterParts.Head[0],
    Special: characterParts.Special[0],
    Mystery: characterParts.Mystery[0],
    
  });

  const handlePartSelect = (category: keyof CharacterParts, partId: number) => {
    setSelectedParts((prevState: any) => ({
      ...prevState,
      [category]: characterParts[category].find(
        (part: CharacterPartType) => part.id === partId
      )!,
    }));
  };

  const getRandomPart = (category: keyof CharacterParts) => {
    const parts = characterParts[category];
    const randomIndex = Math.floor(Math.random() * parts.length);
    return parts[randomIndex];
  };

  const randomizeCharacter = () => {
    const newSelectedParts: SelectedCharacterParts = {
      Background: getRandomPart("Background"),
      Skin: getRandomPart("Skin"),
      Outfit: getRandomPart("Outfit"),
      Head: getRandomPart("Head"),
      Special: getRandomPart("Special"),
      Mystery: getRandomPart("Mystery"),
      
    };
    setSelectedParts(newSelectedParts);
  };

  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center">
      <div className=" max-w-screen-lg w-full px-4 z-10">
        <div className="flex flex-col md:flex-row my-auto p-6 pt-8 bg-[#eeede9] border border-gray-600 rounded-lg shadow-sm gap-4">
          <div className="w-full md:w-5/12 flex justify-center">
            <OhmiePreview
              selectedParts={selectedParts}
              onRandomize={randomizeCharacter}
              previewRef={previewRef}
            />
          </div>
          <div className="w-full md:w-7/12 mx-auto my-auto">
            <div className="ml-4">
              <h1 className={`${inter.className} text-black text-4xl mb-3`}>
                Customize
              </h1>
              <p className={`${inter.className} text-xl text-gray-600 mb-5`}>
                Check back often for new traits!
              </p>
            </div>
            <div className="h-[1px] mx-6 bg-gray-400"></div>
            <div className="w-full grid grid-cols-2 gap-3 p-3 mx-auto">
              {Object.keys(characterParts).map((category) => (
                <div key={category} className="space-y-1">
                  <h2
                    className={` font-semibold text-gray-500 ${inter.className}`}
                  >
                    {category}
                  </h2>
                  <OhmieTraitSelector
                    parts={characterParts[category as keyof CharacterParts]}
                    selected={
                      selectedParts[category as keyof CharacterParts].id
                    }
                    onSelect={(partId: number) =>
                      handlePartSelect(category as keyof CharacterParts, partId)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
