import Modal from "react-bootstrap/Modal";
import { Carousel, Col, Row } from "react-bootstrap";
import { Animal } from "../interfaces/InterfaceAnimal";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

interface ShowAnimalModalProps {
  show: boolean;
  onClose: () => void;
  animal?: Animal | null;
}

const atributes = [
  ["breed", "rasa"],
  ["size", "talie"],
  ["age", "vârstă"],
  ["temperament", "temperament"],
  ["sterilized", "sterilizat"],
  ["microchip", "microcip"],
];

const renderAttributes = (animal: Animal, atributes: string[][]) => {
  return atributes.map((attribute) => {
    return (
      <div key={attribute[0]} className="d-flex justify-content-space-between">
        <strong>
          {attribute[1].charAt(0).toUpperCase() + attribute[1].slice(1) + ":"}
          &nbsp;
        </strong>
        {animal != null
          ? typeof animal[attribute[0]] === "boolean"
            ? animal[attribute[0]]
              ? "Da"
              : "Nu"
            : animal[attribute[0]]
          : ""}
      </div>
    );
  });
};

const showCheck = (animal: Animal, attribute: string) => {
  if (animal != null)
    return animal[attribute] == true ? (
      <FaCheckCircle
        className="mt-3"
        style={{ fontSize: "2.5rem", color: "#28a745" }}
      />
    ) : (
      <FaCircleXmark
        className="mt-3"
        style={{ fontSize: "2.5rem", color: "#dc3545" }}
      />
    );
};

const ShowAnimalModal: React.FC<ShowAnimalModalProps> = ({
  show: blow,
  onClose,
  animal,
}) => {
  return (
    <>
      <Modal show={blow} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title
            style={{ fontSize: "3.5em", textAlign: "center", width: "100%" }}
          >
            {animal?.name} - {animal?.breed}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "1.5em" }}>
          <section className="d-flex justify-content-center w-100">
            <Carousel style={{ width: "80%" }} interval={null}>
              <Carousel.Item>
                <div
                  style={{
                    width: "100%",
                    height: "400px",
                    margin: "20px 0px",
                    padding: "0px 5px",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    src={animal?.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                  ></img>
                </div>
              </Carousel.Item>

              {animal?.animalImageList
                .sort((a, b) => a.position - b.position) //sortare crescatoare dupa pozitia din bd
                .map((image, index) => (
                  <Carousel.Item key={index}>
                    <div
                      style={{
                        width: "100%",
                        height: "400px",
                        margin: "20px 0px",
                        padding: "0px 5px",
                      }}
                    >
                      <img
                        src={image["imageUrl"]}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "20px",
                        }}
                      ></img>
                    </div>
                  </Carousel.Item>
                ))}
            </Carousel>
          </section>
          <div
            style={{ width: "80%" }}
            className="mx-auto d-flex flex-row justify-content-between"
          >
            <div className="">
              {renderAttributes(animal!, atributes.slice(0, 3))}
            </div>
            <div className="">
              {renderAttributes(animal!, atributes.slice(3, 6))}
            </div>
          </div>
          <Row className="mx-auto text-center pt-5" style={{ width: "80%" }}>
            <Col className="my-auto d-flex flex-column align-items-center mb-3">
              Prietenos cu alte animale
              {showCheck(animal!, "friendly")}
            </Col>
            <Col className="my-auto d-flex flex-column align-items-center mb-3">
              Potrivit familiilor cu copii mici
              {showCheck(animal!, "childSafe")}
            </Col>
            <Col className="my-auto d-flex flex-column align-items-center mb-3">
              Necesită hrană specială
              {showCheck(animal!, "specialFood")}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowAnimalModal;
