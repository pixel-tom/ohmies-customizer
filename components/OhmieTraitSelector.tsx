import React, { useState, useEffect, useRef } from "react";
import { CharacterPart } from "../types";
import Image from "next/image";
import { vt } from "@/constants/fonts";

interface Props {
  parts: CharacterPart[];
  selected: number;
  onSelect: (id: number) => void;
}

const OhmieTraitSelector: React.FC<Props> = ({ parts, selected, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  const selectedPart = parts.find((part) => part.id === selected);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (selectorRef.current && !selectorRef.current.contains(target)) {
        setActiveIndex(null);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const setIsOpen = (index: number | null) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const calculateDropdownPosition = (): string => {
    if (selectorRef.current) {
      const rect = selectorRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = 260;

      if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
        return "origin-top-right";
      } else if (spaceAbove >= dropdownHeight) {
        return "origin-bottom-right";
      } else {
        const spaceAbovePercentage = spaceAbove / window.innerHeight;
        const spaceBelowPercentage = spaceBelow / window.innerHeight;

        return spaceAbovePercentage > spaceBelowPercentage
          ? "origin-bottom-right"
          : "origin-top-right";
      }
    }
    return "origin-top-right";
  };

  const dropdownPosition = calculateDropdownPosition();

  return (
    <div
      className={`relative inline-block text-left w-full ${vt.className}`}
    >
      <div className="w-full shadow-md shadow-gray-400/10" ref={selectorRef}>
        <button
          type="button"
          onClick={() => setIsOpen(selected)}
          className="inline-flex justify-between w-full h-14 overflow-hidden rounded-md border border-1 border-gray-300 px-3 py-2 bg-[#f5f5f5]/60 text-lg text-gray-600 hover:bg-[#ebebeb] hover:border-[#a7a7a7] focus:outline-none shadow-inner"
        >
          <div className="flex items-center my-auto">
            {selectedPart && (
              <div>
                <Image
                  src={selectedPart.image}
                  alt={selectedPart.name}
                  width={40}
                  height={40}
                />
              </div>
            )}
            <div className="flex flex-col ml-4 w-16 h-full overflow-hidden my-auto">
              <span className="text-left h-7 text-gray-600">
                {selectedPart ? selectedPart.name : "Select part"}
              </span>
            </div>
          </div>
          <div className="my-auto">
            <svg
              className="h-4 w-4 m-1 ml-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>
      {activeIndex !== null && activeIndex === selected && (
        <div
          className={`absolute ${dropdownPosition} mt-1 max-h-48 w-full overflow-x-auto overflow-y-scroll rounded-md shadow-md bg-[#f5f5f5] ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}
        >
          <div
            className="grid grid-cols-1 border border-gray-300 rounded-md"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {parts.map((part) => (
              <div
                key={part.id}
                onClick={() => {
                  onSelect(part.id);
                  setIsOpen(null);
                }}
                className={`flex items-center gap-2 cursor-pointer border-b border-gray-300 hover:bg-[#e6e6e6] transition duration-150 ease-in-out p-2`}
                role="menuitem"
              >
                <Image
                  src={part.image}
                  alt={part.name}
                  width={35}
                  height={35}
                  className=""
                />
                <span className="text-gray-500">{part.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OhmieTraitSelector;
