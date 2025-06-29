import {
  AnyImage,
  ExistingImage,
  NewImage,
} from "../interfaces/InterfaceAnimal";
import "./AnimalsImageDnd.css";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import AnimalsImage from "./AnimalsImage";
import { isNewImage } from "../utils";

const AnimalsImageDnD = ({ animalImages }: { animalImages: AnyImage[] }) => {
  if (!animalImages) return null;

  return (
    <div className="img_container container py-3">
      <SortableContext
        items={animalImages.map((img) => img.id)}
        strategy={rectSortingStrategy}
      >
        {animalImages.map((animalImage) => (
          <div key={animalImage.id} className="img_wrap">
            <AnimalsImage
              imageUrl={
                isNewImage(animalImage)
                  ? (animalImage as NewImage).previewUrl
                  : (animalImage as ExistingImage).imageUrl
              }
              id={animalImage.id}
            />
          </div>
        ))}
      </SortableContext>
    </div>
  );
};

export default AnimalsImageDnD;
