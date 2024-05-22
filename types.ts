// types.ts
export interface CharacterPart {
  id: number;
  name: string;
  image: string;
}

export interface CharacterParts {
  Background: CharacterPart[];
  Skin: CharacterPart[];
  Outfit: CharacterPart[];
  Head: CharacterPart[];
  Special: CharacterPart[];
  Mystery: CharacterPart[];
}

export interface SelectedCharacterParts {
  Background: CharacterPart;
  Skin: CharacterPart;
  Outfit: CharacterPart;
  Head: CharacterPart;
  Special: CharacterPart;
  Mystery: CharacterPart;
}
