import "../Styles/table.css";
import { useEffect, useState } from "react";
import dog from "../assets/dog_admin.png";
import { Animal } from "../interfaces/InterfaceAnimal";
import { Alert, Button, OverlayTrigger, Popover, Table } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { FaTrashAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import EditModal from "../Components/EditModal";
import { useAnimalContext } from "../ContextAnimal";

type Overview = {
  [key: string]: number;
};

const AnimalsTable = () => {
  const [overview, setOverview] = useState<Overview>({});
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [activePopover, setActivePopover] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  //Modal props
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { animalType } = useAnimalContext();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get<{
          animals: Animal[];
          totalCounts: Overview;
        }>(
          `http://localhost:8090/api/animals/type/${animalType}?adopted=false`
        );
        setAnimals(response.data.animals);
        setOverview(response.data.totalCounts);
      } catch (error) {
        showAlert("danger", "Eroare la încărcarea animalelor");
      }
    };
    fetchAnimals();
  }, [updateTrigger, animalType]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8090/api/animals/delete/${id}`);
      setUpdateTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Eroare la ștergere:", error);
      showAlert("danger", "Eroare la ștergere");
    }
    setActivePopover(null);
  };

  const handleAdopt = async (id: number) => {
    try {
      await axios.patch(`http://localhost:8090/api/animals/adopt/${id}`);
      setUpdateTrigger((prev) => prev + 1);
      showAlert("success", "Animalul a fost adoptat cu succes!");
    } catch (error) {
      console.error("Eroare la adopție:", error);
      showAlert("danger", "Eroare la adopție");
    }
    setActivePopover(null);
  };

  const handleToggleDelete = (id: number) => {
    setActivePopover((prev) => (prev === id ? null : id));
  };

  const handleEdit = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowModal(true);
  };

  const handleSave = (updatedAnimal) => {
    setAnimals((prevAnimals) =>
      prevAnimals.map((animal) =>
        animal.id === updatedAnimal.id ? updatedAnimal : dog
      )
    );
    setUpdateTrigger((prev) => prev + 1);
    setImagePreview(null);
    setSelectedImage(null);
    setShowModal(false);
    showAlert("success", "Animalul a fost actualizat cu succes!");
  };

  const renderPopover = (id: number) => (
    <Popover id={`popover-${id}`}>
      <Popover.Body>
        <p className="text-danger fw-bold fs-5 text-center">
          Ești sigur că vrei să ștergi acest animal?
        </p>
        <div className="d-flex flex-row justify-content-center gap-4">
          <Button
            variant="danger"
            className="me-2"
            onClick={() => handleDelete(id)}
          >
            Șterge
          </Button>
          <Button variant="secondary" onClick={() => handleToggleDelete(id)}>
            Anulează
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  const showAlert = (type: "success" | "danger", message: string) => {
    setAlert({ type, message });
  };
  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <>
      {alert && (
        <Alert
          variant={alert?.type}
          className="position-fixed top-0 start-50 translate-middle-x w-50 text-center shadow"
          dismissible
          onClose={handleCloseAlert}
        >
          {alert?.message}
        </Alert>
      )}
      <h2 className="ms-5 mb-3">Overview</h2>
      <div className="container-fluid p-0 d-flex flex-column">
        <div className="mx-5 p-0 row d-flex justify-content-between">
          <div className="info_card dog_card d-flex col-md-3 flex-row align-items-center ">
            <div className="details ps-3">
              <h2>{overview["caine"] ? overview["caine"] : 0}</h2>
              <p>caini in adapost</p>
            </div>
            <img src={dog} alt="dog_icon" />
          </div>
          <div className="info_card cat_card d-flex col-md-3 flex-row align-items-center">
            <div className="details ps-3">
              <h2>{overview["pisica"] ? overview["pisica"] : 0}</h2>
              <p>pisici in adapost</p>
            </div>
            <img src={"src/assets/pisica.png"} alt="cat_icon" />
          </div>
          <div className="info_card animal_card d-flex col-md-3 flex-row align-items-center">
            <div className="details ps-3">
              <h2>{overview["toate"] ? overview["toate"] : 0}</h2>
              <p className="ms-auto">animale in adapost</p>
            </div>
            <img src={"src/assets/animals.png"} alt="animal_icon" />
          </div>
        </div>
        <div className="container-fluid px-2">
          <Table
            bordered
            hover
            responsive="lg"
            className="text-center mt-5 mx-auto"
            style={{ width: "100%" }}
            id="tabel-animale"
          >
            <thead>
              <tr className="fs-5">
                <th>ID</th>
                <th>Animal</th>
                <th>Nume</th>
                <th>Rasă</th>
                <th>Talie</th>
                <th>Vârstă</th>
                <th>Temperament</th>
                <th>Gen</th>
                <th>Sterilizat</th>
                <th>Microcip</th>
                <th>Prietenos</th>
                <th>Copii</th>
                <th>Hr. spec.</th>
                <th>Imagine</th>
                <th style={{ width: "12%" }}>Operatiuni</th>
              </tr>
            </thead>
            <tbody className="table_animals_body">
              {animals.map((animal) => (
                <tr
                  key={animal.id}
                  className={`align-middle + ${
                    activePopover === animal.id ? "table-danger" : ""
                  }`}
                >
                  <td>{animal.id}</td>
                  <td>{animal.animalType}</td>
                  <td>{animal.name}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.size}</td>
                  <td>{animal.age}</td>
                  <td>{animal.temperament}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.sterilized ? "Da" : "Nu"}</td>
                  <td>{animal.microchip ? "Da" : "Nu"}</td>
                  <td>{animal.friendly ? "Da" : "Nu"}</td>
                  <td>{animal.childSafe ? "Da" : "Nu"}</td>
                  <td>{animal.specialFood ? "Da" : "Nu"}</td>
                  <td>
                    <Image
                      src={animal.image}
                      alt={animal.name}
                      roundedCircle
                      width={60}
                      height={60}
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-evenly">
                      <div>
                        <Button
                          variant="primary"
                          onClick={() => handleEdit(animal)}
                          className="operation-icon position-relative"
                        >
                          <FaEdit />
                        </Button>
                      </div>
                      <div>
                        <OverlayTrigger
                          trigger="click"
                          placement="bottom"
                          overlay={renderPopover(animal.id)}
                          show={activePopover === animal.id}
                          rootClose
                        >
                          <Button
                            variant="danger"
                            onClick={() => handleToggleDelete(animal.id)}
                            className="operation-icon position-relative"
                          >
                            <FaTrashAlt />
                          </Button>
                        </OverlayTrigger>
                      </div>
                      <div>
                        <Button
                          variant="success"
                          onClick={() => handleAdopt(animal.id)}
                          className="operation-icon position-relative"
                        >
                          <FaHeart />
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <EditModal
            animal={selectedAnimal!}
            show={showModal}
            onClose={() => {
              setShowModal(false);
              setImagePreview(null);
              setSelectedImage(null);
            }}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            selectedImage={selectedImage}
            setselectedImage={setSelectedImage}
            handleSave={handleSave}
          ></EditModal>
        </div>
      </div>
    </>
  );
};

export default AnimalsTable;
