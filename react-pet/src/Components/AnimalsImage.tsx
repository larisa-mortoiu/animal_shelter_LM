import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const AnimalsImage = ({
  imageUrl,
  id,
}: {
  imageUrl: string;
  id: number | string;
}) => {
  const {
    attributes,
    over,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    border: isDragging ? "2px dashed black" : "none",
    backgroundColor: isDragging ? "white" : "white",
    borderRadius: "10px",
  };

  return (
    <div
      key={id}
      className="img_wrap"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {<img src={imageUrl} style={{ opacity: isDragging ? 0.2 : 1 }}></img>}
    </div>
  );
};

export default AnimalsImage;
