import AnimalsImageDnD from "./AnimalsImageDnD";
import "../Styles/Sortable.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ExistingImage,
  AnyImage,
  NewImage,
} from "../interfaces/InterfaceAnimal";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import { arrayMove } from "@dnd-kit/sortable";
import ImageUploader from "./ImageUploader";
import { isNewImage } from "../utils";

type SortableProps = {
  id: number;
  closeCarrousel: () => void;
};

const Sortable: React.FC<SortableProps> = ({ id, closeCarrousel }) => {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [animalImageList, setAnimalImageList] = useState<AnyImage[]>([]);
  const getAnimals = async () => {
    // incarcare imagini animale
    const response = await axios.get<ExistingImage[]>(
      `http://localhost:8090/api/animals/images/${id}`
    );

    (response.data as AnyImage[]).map((img) => {
      img.tempPosition = img.position;
    });
    setAnimalImageList(response.data as AnyImage[]);
  };
  useEffect(() => {
    getAnimals(); // Fetch initial imagini animale
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    console.log("activeId", active.id);
  };
  const getImagePosition = (id: string | number) => {
    console.log(
      "getImagePosition",
      animalImageList.findIndex((img) => img.id === id)
    );
    return animalImageList.findIndex((img) => img.id === id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setAnimalImageList((animalImageList) => {
      const originalPos = getImagePosition(active.id);
      const newPos = getImagePosition(over.id);

      animalImageList = arrayMove(animalImageList, originalPos, newPos);

      animalImageList.forEach((img, index) => {
        img.tempPosition = index;
      });

      //!!!!!! FOARTE IMPORTANT, ALTFEL APARE BUG LA DRAG OVERLAY CA RAMANE VECHIUL ID DE LA NEW IMAGE!!!!!!!
      setActiveId(null);
      // ---------------------------------------- //
      return animalImageList;
    });
  };

  const generatePayloadExisting = () => {
    const updateExisting = animalImageList
      .filter((img) => !isNewImage(img))
      .filter((img) => img.position !== img.tempPosition)
      .map((img) => ({
        id: img.id,
        position: img.tempPosition,
      }));
    return updateExisting;
  };

  const generatePayloadNew = () => {
    const newImages = animalImageList
      .filter((img) => isNewImage(img))
      .map((img) => ({
        file: img.file,
        position: img.tempPosition,
      }));

    return newImages;
  };

  const submitImages = async () => {
    try {
      const payload = generatePayloadNew();
      const formData = new FormData();
      payload.forEach((img) => {
        formData.append("files", img.file);
        formData.append("positions", img.position.toString());
      });

      if (formData.getAll("files").length !== 0) {
        const response = await axios.post(
          `http://localhost:8090/api/images/uploadImagesList/${id}`,
          formData
        );
        (response.data as AnyImage[]).forEach((img) => {
          img.tempPosition = img.position;
        });
      }

      const payloadExisting = generatePayloadExisting();

      if (payloadExisting.length === 0) return;
      const response = await axios.post(
        "http://localhost:8090/api/animals/images/position",
        payloadExisting,
        {
          params: {
            animalId: id,
          },
        }
      );
      (response.data as AnyImage[]).forEach((img) => {
        img.tempPosition = img.position;
      });

      console.log("Updated existing images:", response.data);
    } catch (error) {
      console.error("Error submitting new images:", error);
    }
  };

  const handleNewImages = (newImages: NewImage[]) => {
    setAnimalImageList((prev) => {
      const startIndex = prev.length;
      const withPosition = newImages.map((img, i) => ({
        ...img,
        position: startIndex + i,
        tempPosition: startIndex + i,
      }));
      return [...prev, ...withPosition];
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 position-relative">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToFirstScrollableAncestor]}
      >
        <AnimalsImageDnD animalImages={animalImageList} />

        <DragOverlay>
          {activeId &&
            (() => {
              const idx = getImagePosition(activeId);

              const item = animalImageList[idx];

              const src = isNewImage(item)
                ? (item as NewImage).previewUrl
                : (item as ExistingImage).imageUrl;

              return (
                <div className="img_wrap">
                  <img src={src} alt="" />
                </div>
              );
            })()}
        </DragOverlay>
      </DndContext>
      <div className="w-100 d-flex justify-content-end">
        <section className="submit-ribbon position-relative d-flex gap-3">
          <ImageUploader onImagesAdded={handleNewImages} />
          <button
            className="submit-button"
            onClick={() => {
              submitImages();
              closeCarrousel();
            }}
          >
            Salvează
          </button>
        </section>
      </div>
    </div>
  );
};

export default Sortable;
