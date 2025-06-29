import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../Components/Navbar/Navbar";
import "../Styles/Servicii.css";
import adopt from "../assets/adoption_dogs.webp";
import vizita from "../assets/planif_vizita.jpg";
import medical from "../assets/serv_med.jpg";
import donatii from "../assets/donatii2.jpg";
import Info from "../Components/Info/Info";

const Servicii = () => {
  return (
    <>
      <div className="position-absolute container-fluid">
        <Navbar />
      </div>
      <div
        className="cont_serv container-fluid mt-5 position-absolute"
        style={{ top: "100px", height: "100vh" }}
      >
        <h1>Servicii oferite</h1>
        <p className="mx-5 mb-5 text-center">
          Adăpostul nostru oferă o gamă variată de servicii dedicate bunăstării
          animalelor și sprijinirii comunității.
          <br /> Fie că vrei să adopți un prieten blănos, să ne vizitezi, să
          contribui prin donații sau să beneficiezi de servicii medicale pentru
          animale, suntem aici pentru tine.
          <br /> Ne dorim să construim un mediu sigur și prietenos pentru toate
          animalele aflate în grijă și să facilităm conexiunea dintre ele și
          oameni cu suflet mare.
        </p>
        <Container fluid className="cont_serv d-grid gap-3 row-gap-5 p-5 pt-0">
          <Row>
            <Col className="col-4 justify-content-center d-flex ps-0 pe-0 position-relative">
              <div className="gradient_overlay position-absolute h-100 w-100"></div>
              <div className="div_img w-100">
                <img src={adopt} className="img_serv"></img>
              </div>
            </Col>
            <Col className="p-4">
              <h3>Adoptia animalelor</h3>
              <p>
                Oferim posibilitatea de a adopta animale aflate în grija
                adăpostului, toate atent îngrijite și evaluate medical. Fiecare
                adopție înseamnă o nouă șansă la o viață mai bună.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="text-end p-4">
              <h3>Planificarea unei vizite</h3>
              <p>
                Vino să cunoști animalele înainte de a lua o decizie! Poți
                programa ușor o vizită direct din platformă, alegând ziua și ora
                care ți se potrivesc.
              </p>
            </Col>
            <Col className="col-4 justify-content-center d-flex pe-0 position-relative ps-0">
              <div className="gradient_overlay position-absolute h-100 w-100"></div>
              <div className="div_img w-100">
                <img src={vizita} className="img_serv"></img>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-4 justify-content-center d-flex ps-0 position-relative pe-0">
              <div className="gradient_overlay position-absolute h-100 w-100"></div>
              <div className="div_img w-100">
                <img src={medical} className="img_serv"></img>
              </div>
            </Col>
            <Col className="p-4">
              <h3>Suport medical pentru animalele fara stapan</h3>
              <p>
                Adăpostul oferă asistență veterinară de bază pentru animalele
                găzduite: vaccinări, deparazitări, sterilizări și monitorizare a
                stării de sănătate. De asemenea, primim și animale de pe stradă
                care au nevoie urgentă de îngrijiri medicale, în limita
                resurselor disponibile.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="text-end p-4">
              <h3>Donatii pentru adapost</h3>
              <p>
                Susține activitatea adăpostului prin donații! Poți contribui
                financiar sau dona obiecte utile precum hrană, jucării sau
                accesorii pentru animale. Dacă nu poți ajunge personal la
                adăpost, poți face o cerere direct din platformă, iar un membru
                al echipei noastre să vină să preia donația de la tine acasă.
              </p>
            </Col>
            <Col className="col-4 justify-content-center d-flex pe-0 ps-0 position-relative">
              <div className="gradient_overlay position-absolute h-100 w-100"></div>
              <div className="div_img w-100">
                <img src={donatii} className="img_serv"></img>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Servicii;
