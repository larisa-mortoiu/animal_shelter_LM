export type ExistingImage = {
  id: number;
  imageUrl: string; //url din spring
  position: number;
};

export type NewImage = {
  id: string;
  file: File; // fișierul selectat
  previewUrl: string;
  position: number; // pozitie initiala pt vizualizare sortable
};

export type AnyImage = (ExistingImage | NewImage) & {
  tempPosition: number;
};

export interface Animal {
  id: number;
  name: string;
  breed: string;
  size: string;
  age: string;
  temperament: string;
  gender: string;
  image: string;
  animalType: string;
  friendly: boolean;
  childSafe: boolean;
  specialFood: boolean;
  sterilized: boolean;
  microchip: boolean;
  animalImageList: AnyImage[];
}
