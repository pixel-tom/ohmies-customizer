import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import { characterParts } from "../data";
import OhmiePreview from "../components/OhmiePreview";
import { CharacterParts, SelectedCharacterParts } from "../types";
import OhmieTraitSelector from "../components/OhmieTraitSelector";
import { londrina, vt } from "@/constants/fonts";

interface HomeProps {
  setBgImage: (imageUrl: string) => void;
}

const Home: NextPage<HomeProps> = ({ setBgImage }) => {
  const [selectedParts, setSelectedParts] = useState<SelectedCharacterParts>({
    Background: characterParts.Background[0],
    Skin: characterParts.Skin[0],
    Outfit: characterParts.Outfit[0],
    Head: characterParts.Head[0],
    Special: characterParts.Special[0],
    Mystery: characterParts.Mystery[0],
  });

  useEffect(() => {
    setBgImage(selectedParts.Background.image);
  }, [selectedParts.Background, setBgImage]);

  const handlePartSelect = (category: keyof CharacterParts, partId: number) => {
    setSelectedParts((prevState) => ({
      ...prevState,
      [category]: characterParts[category].find((part) => part.id === partId)!,
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
      <div className="max-w-screen-lg w-full px-4 z-10">
        <div className="flex flex-col md:flex-row p-6 pt-8 gap-4">
          <div className="w-full md:w-5/12 flex justify-center mr-10 mb-10">
            <OhmiePreview
              selectedParts={selectedParts}
              setSelectedParts={setSelectedParts}
              previewRef={previewRef}
            />
          </div>
          <div className="w-full md:w-7/12 mx-auto my-auto rounded-2xl">
            <div className="ml-4">
              <p className={`${vt.className} text-xl text-gray-600`}>
                Choose your style!
              </p>
              <div className="flex justify-between mb-4">
                <div className="flex flex-row gap-3">
                  <div
                    className={`${londrina.className} my-auto text-black text-4xl`}
                  >
                    customize your ohmie.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full grid grid-cols-2 gap-3 p-3 mx-auto">
              {Object.keys(characterParts).map((category) => (
                <div key={category} className="space-y-1">
                  <h2
                    className={`font-semibold text-gray-500 ${vt.className}`}
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
