
export interface CharacterPart {
  id: number;
  name: string;
  image: string;
}

export interface CharacterParts {
    [key: string]: CharacterPart[];
  }
  

export interface SelectedCharacterParts {
    [key: string]: CharacterPart;
  }
  