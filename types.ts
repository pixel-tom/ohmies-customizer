// types.ts
export interface CharacterPart {
  id: number;
  name: string;
  image: string;
}

export interface CharacterParts {
  Background: CharacterPart[];
  Type: CharacterPart[];
  Hats: CharacterPart[];
  Clothes: CharacterPart[];
  Eyes: CharacterPart[];
  Mouth: CharacterPart[];
  Special: CharacterPart[];
  Vr: CharacterPart[];
}

export interface SelectedCharacterParts {
  Background: CharacterPart;
  Type: CharacterPart;
  Hats: CharacterPart;
  Clothes: CharacterPart;
  Eyes: CharacterPart;
  Mouth: CharacterPart;
  Special: CharacterPart;
  Vr: CharacterPart;
}
