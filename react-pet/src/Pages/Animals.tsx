import paw from "../assets/paw2.png";
import home from "../assets/home.png";
import cat from "../assets/cat.png";
import "../Styles/Animals.css";
import { TfiRulerPencil } from "react-icons/tfi";
import { PiCalendarDuotone } from "react-icons/pi";
import { PiDog } from "react-icons/pi";
import { GiPawHeart } from "react-icons/gi";
import { CgGenderMale, CgGenderFemale } from "react-icons/cg";
import axios from "axios";
import { Animal } from "../interfaces/InterfaceAnimal";
import { SyntheticEvent, useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import ShowAnimalModal from "../Components/ShowAnimalModal";
import { useAnimalContext } from "../ContextAnimal";
import Slider from "@mui/material/Slider";

const Animals = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [show, setShow] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [animalSize, setAnimalSize] = useState<string>("toate");
  const { animalType, setAnimalType } = useAnimalContext();
  const [ageRange, setAgeRange] = useState<number[]>([0, 15]);
  const [ageRangeCommitted, setAgeRangeCommitted] = useState<number[]>([0, 15]);

  const handleShow = (index: number) => {
    setCurrentAnimal(animals[index]);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleAnimalTypeChange = (type: string) => {
    setAnimalType(type);
  };

  const handleAnimalSizeChange = (size: string) => {
    setAnimalSize(size);
  };

  const handleAgeChange = (event, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };

  const handleAgeChangeCommitted = (
    event: Event | SyntheticEvent,
    newValue: number | number[]
  ) => {
    setAgeRangeCommitted(newValue as number[]);
  };

  useEffect(() => {
    const filterAnimals = async () => {
      try {
        const response = await axios.get<Animal[]>(
          `http://localhost:8090/api/animals/filter`,
          {
            params: {
              animalType: animalType,
              size: animalSize,
              minAge: ageRange[0],
              maxAge: ageRange[1],
            },
          }
        );
        setAnimals(response.data);
      } catch (error) {
        console.error("Eroare încărcare animale:", error);
      }
    };

    filterAnimals();
  }, [animalType, animalSize, ageRangeCommitted]);

  return (
    <>
      <Navbar />
      <div className="intro pt-5 mt-5">
        <h1>Cum poți adopta un animăluț?</h1>
        <p className="fs-3">
          La Happy Paws facem tot posibilul ca procesul de adopție să fie unul
          cât mai rapid, simplu și la îndemâna tuturor
        </p>
        <div
          className="container-fluid text-center mt-5 d-flex justify-content-evenly"
          id="info-cards"
        >
          <div
            className="p-0 d-flex justify-content-center"
            style={{ width: "25em" }}
          >
            <div className="tutorial d-flex  flex-column align-items-center justify-content-start">
              <div
                className="mt-4 d-flex img-section position-relative"
                style={{ backgroundColor: "rgba(255, 0, 0, 0.134)" }}
              >
                <img
                  src={paw}
                  className="position-absolute top-50 start-50 translate-middle"
                />
              </div>
              <div className="d-flex justify-content-center p-3 ">
                <h3
                  style={{
                    color: "rgba(237, 20, 20, 0.77)",
                    fontSize: "2rem",
                  }}
                >
                  Vizitează-ne adăpostul!
                </h3>
              </div>
              <div className="d-flex flex-column justify-content-center h-100">
                <p className="px-2 mt-0 fs-5">
                  Progreamează o vizită pentru a face cunoștință cu animăluțele
                  din adăpost!
                </p>
              </div>
            </div>
          </div>
          <div
            className="p-0  d-flex  justify-content-center"
            style={{ width: "25em" }}
          >
            <div className="tutorial d-flex flex-column align-items-center justify-content">
              <div
                className=" mt-4 d-flex img-section position-relative"
                style={{ backgroundColor: "rgba(178, 255, 188, 0.89)" }}
              >
                <img
                  src={cat}
                  className="position-absolute top-50 start-50 translate-middle"
                />
              </div>
              <div className="p-3">
                <h3
                  style={{
                    color: "rgb(140, 209, 149)",
                    fontSize: "2rem",
                  }}
                >
                  Completează formularul de adopție
                </h3>
              </div>
              <div className="d-flex flex-column justify-content-center h-100 ">
                <p className="px-2 mt-0 fs-5">
                  Poți completa pe loc formularul pentru adopția animalului
                </p>
              </div>
            </div>
          </div>
          <div
            className="p-0 d-flex justify-content-center"
            style={{ width: "25em" }}
          >
            <div className="tutorial d-flex flex-column align-items-center justify-content-start">
              <div
                className=" mt-4 d-flex img-section position-relative"
                style={{ backgroundColor: "rgba(0, 115, 255, 0.47)" }}
              >
                <img
                  src={home}
                  className="position-absolute top-50 start-50 translate-middle"
                />
              </div>
              <div className="d-flex justify-content-center p-3">
                <h3
                  style={{
                    color: "rgba(20, 103, 237, 0.87)",
                    fontSize: "2rem",
                  }}
                >
                  Mergi acasă cu noul tău prieten
                </h3>
              </div>
              <div className="d-flex flex-column justify-content-end h-100">
                <p className="px-2 mt-0 fs-5">
                  După adopție, animăluțul tău e pregătit să-și cunoască noua
                  casă!
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-5"></hr>
        <h2 className="ms-5 mb-4">
          Animale disponibile pentru adopție: <span>{animals.length}</span>
        </h2>

        <h4 className="ms-5 mb-3">Filtrează animalele după:</h4>
        <div className="ms-5 w-50 mb-5 d-flex justify-content-start align-items-center gap-4">
          <select
            className="form-select w-25"
            aria-label="Default select example"
            onChange={(e) => handleAnimalTypeChange(e.target.value)}
            style={{ fontSize: "1.2rem" }}
          >
            <option value="toate">Toate tipurile</option>
            <option value="caine">Caine</option>
            <option value="pisica">Pisica</option>
          </select>
          <select
            className="form-select w-25"
            aria-label="Default select example"
            onChange={(e) => handleAnimalSizeChange(e.target.value)}
            style={{ fontSize: "1.2rem" }}
          >
            <option value="toate">Toate taliile</option>
            <option value="mica">Mica</option>
            <option value="medie">Medie</option>
            <option value="mare">Mare</option>
          </select>
          <div className="flex-grow-1">
            <h4 className="text-center mb-0">Intervalul de vârstă</h4>
            <div>
              <span className="fs-5" style={{ verticalAlign: "top" }}>
                0
              </span>
              <Slider
                className="w-75 ms-4 me-4"
                getAriaLabel={() => "Minimum distance"}
                value={ageRange}
                onChange={handleAgeChange}
                onChangeCommitted={handleAgeChangeCommitted}
                valueLabelDisplay="auto"
                disableSwap
                min={0}
                max={15}
              />
              <span className="fs-5" style={{ verticalAlign: "top" }}>
                15
              </span>
            </div>
          </div>
        </div>
        <div
          className="container-fluid text-center justify-content-center m-0"
          style={{ width: "100%" }}
        >
          <div className="row">
            {animals.map((animal, index) => (
              <div key={index} className="col-4 mb-4">
                <div className="d-flex justify-content-center">
                  <div
                    className="card custom-card d-flex flex-column"
                    onClick={() => handleShow(index)}
                  >
                    <img src={animal.image} className="card-img-top" />
                    <div className="card-body p-2">
                      <div className="container p-0 d-flex align-items-center mb-3  border-bottom border-2 border-primary-subtle">
                        <h5 className="card-title me-auto ms-2 mb-0">
                          {animal.name}
                        </h5>
                        {animal.gender == "mascul" ? (
                          <CgGenderMale
                            className="me-2"
                            style={{
                              color: "rgb(48, 181, 225)",
                              stroke: "rgba(38, 40, 37, 0.81)",
                              strokeWidth: "0.9px",
                              paintOrder: "stroke fill",
                            }}
                          />
                        ) : (
                          <CgGenderFemale
                            className="me-2"
                            style={{
                              color: "rgb(226, 103, 242) ",
                              stroke: "rgba(38, 40, 37, 0.81)",
                              strokeWidth: "0.9px",
                              paintOrder: "stroke fill",
                            }}
                          />
                        )}
                      </div>
                      <div className="container text-center p-0">
                        <div className="row row-cols-2 w-100 m-0 align-items-center">
                          <div className="p-0 col-7 ">
                            <div className="detail d-flex position-relative align-items-center mb-3">
                              <div className="icon align-content-center position-relative">
                                <div className="d-inline-block">
                                  <PiDog />
                                </div>
                                <h4 className="me-2 mb-0 d-inline-block ">
                                  Rasă:
                                </h4>
                              </div>
                              <div className="p-0 text-start">
                                <h4 className="me-2 mb-0 d-inline-block">
                                  {animal.breed}
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="p-0 col-5 ">
                            <div className="detail d-flex position-relative align-items-center mb-3 justify-content-start">
                              <div className="icon align-content-center position-relative">
                                <div className="d-inline-block">
                                  <TfiRulerPencil />
                                </div>
                                <h4 className="me-2 mb-0 d-inline-block ">
                                  Talie:
                                </h4>
                              </div>
                              <div className="p-0">
                                <h4 className="me-2 mb-0 d-inline-block">
                                  {animal.size}
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="col-7 p-0 ">
                            <div className="detail d-flex position-relative align-items-center">
                              <div className="icon align-content-center position-relative ">
                                <div className="d-inline-block">
                                  <GiPawHeart />
                                </div>
                                <h4 className="me-2 mb-0 d-inline-block ">
                                  Temperament:
                                </h4>
                              </div>
                              <div className="p-0">
                                <h4 className="me-2 mb-0 d-inline-block">
                                  {animal.temperament}
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="col-5 p-0 ">
                            <div className="detail d-flex position-relative align-items-center justify-content-start  ">
                              <div className="icon align-content-center position-relative">
                                <div className="d-inline-block">
                                  <PiCalendarDuotone />
                                </div>
                                <h4 className="me-2 mb-0 d-inline-block ">
                                  Vârstă:
                                </h4>
                              </div>
                              <div className="p-0 text-end">
                                <h4 className="mb-0 d-inline-block flex-shrink-1">
                                  {animal.age}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ShowAnimalModal
        show={show}
        onClose={handleClose}
        animal={currentAnimal}
      />
    </>
  );
};

export default Animals;
