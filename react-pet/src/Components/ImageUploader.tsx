import React, { useRef } from "react";
import { NewImage } from "../interfaces/InterfaceAnimal";

type Props = {
  onImagesAdded: (images: NewImage[]) => void;
};

const ImageUploader = ({ onImagesAdded }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: NewImage[] = Array.from(files).map((file, index) => ({
      id: "new-" + crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      position: index,
    }));

    onImagesAdded(newImages);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <button
        className="browse-button"
        onClick={() => inputRef.current?.click()}
      >
        Alege imagine
      </button>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFilesSelected}
      />
    </>
  );
};

export default ImageUploader;
