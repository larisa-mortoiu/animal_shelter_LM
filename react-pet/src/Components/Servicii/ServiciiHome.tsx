import { useEffect, useRef, useState } from "react";
import "./ServiciiHome.css";
import vizita from "../../assets/vizita.jpg";
import animale from "../../assets/animale.png";
import medic from "../../assets/servicii medicale.jpg";
import donatii from "../../assets/donatii.png";
import { Link, useNavigate } from "react-router-dom";

const ServiciiHome = () => {
  const navigate = useNavigate();
  const imageRef = useRef<HTMLImageElement>(null);
  const [divWidth, setDivWidth] = useState("auto");

  useEffect(() => {
    const updateDivWidth = () => {
      if (imageRef.current) {
        const imageWidth = imageRef.current.offsetWidth;
        setDivWidth(imageWidth + "px");
      }
    };

    const imageElement = imageRef.current;

    if (imageElement) {
      imageElement.addEventListener("load", updateDivWidth);
      window.addEventListener("resize", updateDivWidth);

      if (imageElement.complete) {
        updateDivWidth();
      }

      return () => {
        imageElement.removeEventListener("load", updateDivWidth);
        window.removeEventListener("resize", updateDivWidth);
      };
    }
  }, []);

  return (
    <>
      <div id="servicii-div">
        <h1 className="servicii-title">Servicii</h1>
      </div>
      <div className="servicii-home">
        <div className="servicii-homes" onClick={() => navigate("/Adopt")}>
          <img ref={imageRef} src={animale} alt="" />
          <div className="caption" style={{ width: divWidth }}>
            <p>Adoptia animalelor</p>
          </div>
        </div>
        <div className="servicii-homes" onClick={() => navigate("/VisitForm")}>
          <img src={vizita} alt="" />
          <div className="caption" style={{ width: divWidth }}>
            <p>Planificare vizite</p>
          </div>
        </div>
        <div className="servicii-homes">
          <img src={medic} alt="" />
          <div className="caption" style={{ width: divWidth }}>
            <p>Suport medical</p>
          </div>
        </div>
        <div className="servicii-homes" onClick={() => navigate("/Donation")}>
          <img src={donatii} alt="" />
          <div className="caption" style={{ width: divWidth }}>
            <p>Donatii</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiciiHome;
