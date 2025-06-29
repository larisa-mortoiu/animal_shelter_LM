import { AnyImage, NewImage } from "./interfaces/InterfaceAnimal";


export function isNewImage(image: AnyImage): image is NewImage & {tempPosition: number} {

  return typeof image.id === "string" && "previewUrl" in image;
}