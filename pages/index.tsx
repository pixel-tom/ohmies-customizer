import type { NextPage } from "next";
import { useState, useRef } from "react";
import { characterParts } from "../data";
import CharacterPartSelector from "../components/DogeTraitSelector";
import CharacterPreview from "../components/DogePreview";
import {
  CharacterParts,
  CharacterPart as CharacterPartType,
  SelectedCharacterParts,
} from "../types";

import { Gloria_Hallelujah } from "next/font/google";

const inter = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: "400",
});

const Home: NextPage = () => {
  const [selectedParts, setSelectedParts] = useState<SelectedCharacterParts>({
    type: characterParts.type[0],
    hats: characterParts.hats[0],
    bottoms: characterParts.bottoms[0],
    tops: characterParts.tops[0],
    eyes: characterParts.eyes[0],
    face: characterParts.face[0],
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
      type: getRandomPart("type"),
      hats: getRandomPart("hats"),
      bottoms: getRandomPart("bottoms"),
      tops: getRandomPart("tops"),
      eyes: getRandomPart("eyes"),
      face: getRandomPart("face"),
    };
    setSelectedParts(newSelectedParts);
  };

  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#f5f5f5] xs:mt-20 flex flex-col items-center">
      <div className=" max-w-screen-lg w-full my-auto  px-4 z-10">
        <div className="flex flex-col md:flex-row p-6 pt-8 bg-[#eeede9] my-14 border border-gray-600 rounded-lg shadow-sm gap-4">
          <div className="w-full md:w-5/12 flex justify-center">
            <CharacterPreview
              selectedParts={selectedParts}
              onRandomize={randomizeCharacter}
              previewRef={previewRef}
            />
          </div>
          <div className="w-full md:w-7/12 mx-auto my-auto">
            <h1 className={`${inter.className} text-black text-3xl mb-3`}>Customize</h1>
            <p className="text-sm text-gray-600 mb-5">Check back often for new traits!</p>
            <div className="h-[1px] mx-6 bg-gray-400"></div>
            <div className="w-full grid grid-cols-2 gap-3 p-3 mx-auto">
              {Object.keys(characterParts).map((category) => (
                <div key={category} className="space-y-1">
                  <h2 className="text-xs font-semibold text-gray-800">{category}</h2>
                  <CharacterPartSelector
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
