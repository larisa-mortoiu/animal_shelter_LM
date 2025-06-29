import "./Hero.css";
import blob from "../../assets/blob.png";
import dog from "../../assets/dog-removebg.png";
import treat from "../../assets/treat.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero div-container d-flex">
      <div className="row" style={{ marginTop: "4em" }}>
        <div className="col div1 ms-5 d-flex justify-content-center align-items-center">
          <img className="treat" src={treat} alt="treat" />
          <div className="hero-text">
            <p className="text-dog">
              Orice animăluț merită un adăpost plin de iubire.
              <br />
              <span style={{ color: "green" }}>Adoptă</span> animalul dorit
              astăzi!
            </p>
            <p>
              Oferă o șansă la fericire unui suflet blănos. Adopția nu doar
              salvează vieți, ci îți aduce și un prieten loial pe viață!
            </p>
          </div>
        </div>
        <div className="col div2">
          <div className="svg-container">
            <img className="blob" src={blob} alt="blob" />
            <img className="dog" src={dog} alt="dog" />
          </div>
        </div>
        <div className="adopt col-12">
          <h1>Adoptă chiar acum!</h1>
          <div>
            <button className="btn-custom">
              <Link to="/VisitForm">
                <span>Planifică o vizită</span>
              </Link>
            </button>
            <button className="btn-custom">
              <Link to="/Adopt">
                <span>Vezi animalele </span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
