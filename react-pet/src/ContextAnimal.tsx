import { createContext, useContext, useState, ReactNode } from "react";

type AnimalContextType = {
  animalType: string;
  setAnimalType: (type: string) => void;
};

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export const AnimalProvider = ({ children }: { children: ReactNode }) => {
  const [animalType, setAnimalType] = useState<string>("toate");

  return (
    <AnimalContext.Provider value={{ animalType, setAnimalType }}>
      {children}
    </AnimalContext.Provider>
  );
};

export const useAnimalContext = () => {
  const context = useContext(AnimalContext);
  if (!context) {
    throw new Error("useAnimalContext must be used within an AnimalProvider");
  }
  return context;
};
