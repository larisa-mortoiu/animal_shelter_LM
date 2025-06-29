import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Animal } from "../interfaces/InterfaceAnimal";

const AddAnimalForm: React.FC = () => {
  const [formData, setFormData] = useState<
    Animal & { ageUnit: "luni" | "ani" }
  >({
    id: 0,
    name: "",
    breed: "",
    size: "Mica",
    age: "1",
    ageUnit: "ani",
    temperament: "",
    gender: "mascul",
    image: "",
    animalType: "Caine",
    sterilized: false,
    microchip: false,
    friendly: false,
    childSafe: false,
    specialFood: false,
    animalImageList: [],
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;

    setFormData({
      ...formData,
      [target.name]: target.value,
    });

    console.log(target.name, target.value);
    console.log(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image;

    if (selectedImage) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", selectedImage);

      try {
        const response = await axios.post(
          "http://localhost:8090/api/images/upload",
          formDataUpload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = response.data;
      } catch (error) {
        return;
      }
    }

    try {
      await axios.post("http://localhost:8090/api/animals/add", {
        ...formData,
        image: imageUrl,
        age: `${formatAgeText()}`,
      });

      setFormData({
        id: 0,
        name: "",
        breed: "",
        size: "Mica",
        age: "1",
        ageUnit: "ani",
        temperament: "",
        gender: "mascul",
        image: "",
        animalType: "Caine",
        sterilized: false,
        microchip: false,
        friendly: false,
        childSafe: false,
        specialFood: false,
        animalImageList: [],
      });
      setImagePreview(null);
    } catch (error) {}
  };

  const formatAgeText = () => {
    const ageNumber = parseInt(formData.age);
    const unit = formData.ageUnit;

    if (isNaN(ageNumber) || ageNumber <= 0) return "Vârstă invalidă";

    if (ageNumber === 1) {
      return unit === "luni" ? "1 lună" : "1 an";
    } else {
      return unit === "luni" ? `${ageNumber} luni` : `${ageNumber} ani`;
    }
  };

  return (
    <div className="container ms-4 mt-2 fs-5">
      <h2 className="mb-4 px-2">Adaugă Animal Nou</h2>
      <div className="container px-2 ">
        <Form onSubmit={handleSubmit}>
          <div className="row gx-5">
            <div className="col-md-4 ">
              <Form.Group className="mb-3 w-75">
                <Form.Label>Tip Animal</Form.Label>
                <Form.Select
                  name="animalType"
                  value={formData.animalType}
                  onChange={handleChange}
                >
                  <option value="Caine">Caine</option>
                  <option value="Pisica">Pisica</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 w-75">
                <Form.Label>Gen</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="mascul">Mascul</option>
                  <option value="femela">Femela</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 w-75">
                <Form.Label>Nume</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Introdu numele animalului"
                />
              </Form.Group>

              <Form.Group className="mb-3 w-75">
                <Form.Label>Rasă</Form.Label>
                <Form.Control
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="Introdu rasa"
                />
              </Form.Group>

              <Form.Group className="mb-3 w-75">
                <Form.Label>Talie</Form.Label>
                <Form.Select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                >
                  <option>Mica</option>
                  <option>Medie</option>
                  <option>Mare</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 w-75">
                <Form.Label>Vârstă</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    style={{ width: "100px", marginRight: "10px" }}
                    min="1"
                  />
                  <Form.Select
                    name="ageUnit"
                    value={formData.ageUnit}
                    onChange={handleChange}
                  >
                    <option value="luni">Luni</option>
                    <option value="ani">Ani</option>
                  </Form.Select>
                </div>
                <small className="text-muted">{formatAgeText()}</small>
              </Form.Group>
            </div>

            <div className="col-md-4 d-flex flex-column align-items-start">
              <Form.Group className="mb-3 w-75">
                <Form.Label>Temperament</Form.Label>
                <Form.Control
                  type="text"
                  name="temperament"
                  value={formData.temperament}
                  onChange={handleChange}
                  placeholder="Introdu temperamentul"
                />
              </Form.Group>

              <Form.Group className="mb-3 w-75">
                <Form.Label>Sterilizat</Form.Label>
                <Form.Select
                  name="sterilized"
                  value={formData.sterilized ? "true" : "false"}
                  onChange={handleChange}
                >
                  <option value="true">Da</option>
                  <option value="false">Nu</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 w-75">
                <Form.Label>Potrivit familiilor cu copii</Form.Label>
                <Form.Select
                  name="childSafe"
                  value={formData.childSafe ? "true" : "false"}
                  onChange={handleChange}
                >
                  <option value="true">Da</option>
                  <option value="false">Nu</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 w-75">
                <Form.Label>Prietenos cu alte animale</Form.Label>
                <Form.Select
                  name="friendly"
                  value={formData.friendly ? "true" : "false"}
                  onChange={handleChange}
                >
                  <option value="true">Da</option>
                  <option value="false">Nu</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 w-75">
                <Form.Label>Microcip</Form.Label>
                <Form.Select
                  name="microchip"
                  value={formData.microchip ? "true" : "false"}
                  onChange={handleChange}
                >
                  <option value="true">Da</option>
                  <option value="false">Nu</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 w-75">
                <Form.Label>Necesită hrană specială</Form.Label>
                <Form.Select
                  name="specialFood"
                  value={formData.specialFood ? "true" : "false"}
                  onChange={handleChange}
                >
                  <option value="true">Da</option>
                  <option value="false">Nu</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4 d-flex flex-column align-items-start">
              <Form.Group className="mb-3 w-75">
                <Form.Label>Imagine</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple={false}
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ maxWidth: "200px" }}
                    />
                  </div>
                )}
              </Form.Group>
            </div>
          </div>

          <div className="text-center mt-4">
            <Button variant="primary" type="submit">
              Adaugă Animal
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddAnimalForm;
