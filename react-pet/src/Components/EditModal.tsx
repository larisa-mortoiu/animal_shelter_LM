import React, { useEffect, useState } from "react";
import { Animal } from "../interfaces/InterfaceAnimal";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Sortable from "./Sortable";
import "../Styles/EditModal.css";

interface EditAnimalModalProps {
  animal: Animal;
  show: boolean;
  onClose: () => void;
  selectedImage: File | null;
  setselectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  handleSave: (updatedAnimal: Animal) => void;
}

const EditModal: React.FC<EditAnimalModalProps> = ({
  animal,
  show,
  onClose,
  imagePreview,
  setImagePreview,
  selectedImage,
  setselectedImage: setSelectedImage,
  handleSave,
}) => {
  const [formData, setFormData] = useState<Animal>({
    id: 0,
    name: "",
    breed: "",
    size: "",
    age: "",
    temperament: "",
    gender: "",
    image: "",
    animalType: "",
    sterilized: false,
    microchip: false,
    friendly: false,
    childSafe: false,
    specialFood: false,
    animalImageList: [],
  });

  const [carousselShow, setCarrouselShow] = useState(false);

  const handleShow = () => {
    setCarrouselShow(true);
  };

  const handleClose = () => {
    setCarrouselShow(false);
  };

  useEffect(() => {
    if (animal) {
      setFormData(animal);
    }
  }, [animal]);

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData((prev) => ({
      ...prev!,
      [target.name]: target.value,
    }));
    console.log(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    let imageUrl = formData.image;

    if (selectedImage) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", selectedImage);

      try {
        const response = await axios.post(
          "http://localhost:8090/api/images/upload",
          formDataUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = response.data;
      } catch (error) {
        console.error("Eroare la upload:", error);
      }
    }

    try {
      await axios.put(
        `http://localhost:8090/api/animals/update/${formData.id}`,
        {
          ...formData,
          image: imageUrl,
        }
      );

      handleSave({ ...formData, image: imageUrl });
    } catch (error) {
      console.error("Eroare la salvarea animalului:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      className={`${show ? (carousselShow ? "hidden" : " ") : ""}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editare Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container d-flex flex-row">
          <div className="w-auto">
            <Form className="ms-3">
              <Form.Group className="mb-3">
                <Form.Label>Nume</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rasă</Form.Label>
                <Form.Control
                  type="text"
                  name="breed"
                  value={formData?.breed}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Talie</Form.Label>
                <Form.Select
                  as="select"
                  name="size"
                  value={formData?.size}
                  onChange={handleChange}
                  onSelect={(e) => {
                    console.log("Selected: " + e.target);
                  }}
                >
                  <option>Mica</option>
                  <option>Medie</option>
                  <option>Mare</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Vârstă</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  value={formData?.age}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Temperament</Form.Label>
                <Form.Control
                  type="text"
                  name="temperament"
                  value={formData?.temperament}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gen</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData?.gender}
                  onChange={handleChange}
                >
                  <option value={"mascul"}>Mascul</option>
                  <option value={"femela"}>Femela</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sterilizat</Form.Label>
                <Form.Select
                  name="sterilized"
                  value={String(formData?.sterilized)}
                  onChange={handleChange}
                >
                  <option value={"true"}>Da</option>
                  <option value={"false"}>Nu</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Potrivit familiilor cu copii</Form.Label>
                <Form.Select
                  name="childSafe"
                  value={String(formData?.childSafe)}
                  onChange={handleChange}
                >
                  <option value={"true"}>Da</option>
                  <option value={"false"}>Nu</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>

          <div className="d-flex justify-content-start flex-grow-1 flex-column">
            <div className="d-flex img-cont justify-content-center">
              <Form.Group className="w-100 d-flex flex-column align-items-center">
                <section className="" style={{ width: "80%" }}>
                  <Form.Label htmlFor="ceva">Image</Form.Label>

                  <Form.Control
                    id="ceva"
                    placeholder="ceva"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </section>
                <div className="d-flex justify-content-center img-wrap">
                  <img
                    src={imagePreview == null ? formData.image : imagePreview!}
                    alt={formData?.name + " image"}
                    className="animal-image mt-4"
                  />
                </div>
              </Form.Group>
            </div>
            <section className="d-flex justify-content-center h-100">
              <div className="d-flex flex-row" style={{ width: "80%" }}>
                <Form className="h-auto d-flex flex-column justify-content-end align-items-start w-auto">
                  <Form.Group className="mb-3 w-100">
                    <Form.Label>Prietenos cu alte animale</Form.Label>
                    <Form.Select
                      name="friendly"
                      value={String(formData?.friendly)}
                      onChange={handleChange}
                    >
                      <option value={"true"}>Da</option>
                      <option value={"false"}>Nu</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 w-100">
                    <Form.Label>Microcip</Form.Label>
                    <Form.Select
                      name="microchip"
                      value={String(formData?.microchip)}
                      onChange={handleChange}
                    >
                      <option value={"true"}>Da</option>
                      <option value={"false"}>Nu</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 w-100">
                    <Form.Label>Necesită hrană specială</Form.Label>
                    <Form.Select
                      name="specialFood"
                      value={String(formData?.specialFood)}
                      onChange={handleChange}
                    >
                      <option value={"true"}>Da</option>
                      <option value={"false"}>Nu</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-center align-items-end flex-grow-1">
                  <button
                    className="btn btn-primary"
                    onClick={handleShow}
                    style={{ position: "relative", bottom: "calc(55% + 8px)" }}
                  >
                    Edit Image carrousel
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
      <Modal
        show={carousselShow}
        onHide={() => setCarrouselShow(false)}
        size="xl"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{ fontSize: "3.5em", textAlign: "center", width: "100%" }}
          >
            {animal?.name} - Galerie Imagini
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "1.5em" }}>
          {animal && <Sortable id={animal?.id} closeCarrousel={handleClose} />}
        </Modal.Body>
      </Modal>
    </Modal>
  );
};

export default EditModal;
