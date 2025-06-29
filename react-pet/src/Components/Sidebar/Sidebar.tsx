import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import { GiPawHeart } from "react-icons/gi";
import { GiDogHouse } from "react-icons/gi";
import { PiDog } from "react-icons/pi";
import { TbHomeHeart } from "react-icons/tb";
import { PiSecurityCameraFill } from "react-icons/pi";
import { useAnimalContext } from "../../ContextAnimal";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { AdminOutletContext } from "../../Pages/AdminPage";

const Sidebar = ({ handleSetVisitStatus }: AdminOutletContext) => {
  const [activeLink, setActiveLink] = useState<string>("/");
  const [isAnimalOpen, setIsAnimalOpen] = useState(false);
  const [isVisitsOpen, setIsVisitsOpen] = useState(false);
  const [isAdoptedOpen, setIsAdoptedOpen] = useState(false);
  const [isMonitoringOpen, setIsMonitoringOpen] = useState(false);
  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    if (path == "animale") {
      setIsAnimalOpen(true);
    } else {
      setIsAnimalOpen(false);
    }

    if (path == "adopted") {
      setIsAdoptedOpen(true);
    } else {
      setIsAdoptedOpen(false);
    }

    if (path == "vizite") {
      setIsVisitsOpen(true);
    } else {
      setIsVisitsOpen(false);
    }

    if (path == "monitoring") {
      setIsMonitoringOpen(true);
    } else {
      setIsMonitoringOpen(false);
    }
  };

  const { setAnimalType } = useAnimalContext();
  const navigate = useNavigate();
  return (
    <div
      className="m-3"
      style={{ background: "rgba(0,0,0,0) !important", width: "250px" }}
    >
      <div className="sidebar m-1">
        <div className="p-0 h-50">
          <div className="d-flex flex-row align-items-center h-25 px-3">
            <IoChevronBackCircleSharp onClick={() => navigate("/")} />
            <h5
              className="m-0 flex-grow-1 justify-content-center"
              style={{ display: "flex", textWrap: "nowrap" }}
            >
              Dashboard
            </h5>
          </div>
          <ul className="nav flex-column ps-2 w-100">
            <li className="d-flex flex-row w-100 p-0 nav-item">
              <div className="m-0 p-0 container">
                <div
                  className={`row link-container position-relative py-2 m-0 ${
                    activeLink === "animale" ? "active" : ""
                  }`}
                  onClick={() => {
                    handleLinkClick("animale");
                    setAnimalType("toate");
                  }}
                >
                  <div className="col-3 icon">
                    <PiDog />
                  </div>
                  <div className="col-9">
                    <Link to="/Admin" className="nav-link">
                      Animale
                    </Link>
                  </div>
                </div>
                <div
                  className={`d-flex justify-content-center flex-column option text-center position-relative 
                    ${isAnimalOpen ? "active" : ""}`}
                >
                  <div
                    className="w-100 position-relative option-content text-center"
                    onClick={() => setAnimalType("CAINE")}
                  >
                    <h2>
                      <span className="ms-4">Câini</span>
                    </h2>
                  </div>
                  <div
                    className="w-100 position-relative option-content"
                    onClick={() => setAnimalType("PISICA")}
                  >
                    <h2>
                      <span className="ms-4">Pisici</span>
                    </h2>
                  </div>
                </div>
              </div>
            </li>
            <li className="d-flex flex-row w-100 p-0 nav-item">
              <div className="m-0 p-0 container">
                <div
                  className={`row link-container position-relative py-2 m-0 ${
                    activeLink === "adopted" ? "active" : ""
                  }`}
                  onClick={() => {
                    handleLinkClick("adopted");
                    setAnimalType("toate");
                  }}
                >
                  <div className="col-3 icon">
                    <TbHomeHeart />
                  </div>
                  <div className="col-9">
                    <Link to="/Admin/adopted" className="nav-link">
                      Animale adoptate
                    </Link>
                  </div>
                </div>
                <div
                  className={`d-flex justify-content-center flex-column option text-center position-relative 
                    ${isAdoptedOpen ? "active" : ""}`}
                >
                  <div
                    className="w-100 position-relative option-content text-center"
                    onClick={() => setAnimalType("CAINE")}
                  >
                    <h2>
                      <span className="ms-4">Câini</span>
                    </h2>
                  </div>
                  <div
                    className="w-100 position-relative option-content"
                    onClick={() => setAnimalType("PISICA")}
                  >
                    <h2>
                      <span className="ms-4">Pisici</span>
                    </h2>
                  </div>
                </div>
              </div>
            </li>
            <li className="d-flex flex-row w-100 p-0 nav-item">
              <div className="m-0 p-0 container ">
                <div
                  className={`row m-0 py-2 link-container position-relative ${
                    activeLink === "/Admin/#adauga" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("/Admin/#adauga")}
                >
                  <div className="col-3 icon">
                    <GiDogHouse />
                  </div>
                  <div className="col-9">
                    <Link to="/Admin/add" className="nav-link">
                      Adauga
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li className="d-flex flex-row w-100 p-0 nav-item">
              <div className="m-0 p-0 container ">
                <Link to="/Admin/visits">
                  <div
                    className={`row m-0 py-2 link-container position-relative ${
                      activeLink === "vizite" ? "active" : ""
                    }`}
                    onClick={() => {
                      handleLinkClick("vizite");
                      navigate("/Admin/visits");
                      handleSetVisitStatus("TOATE");
                    }}
                  >
                    <div className="col-3 icon">
                      <GiPawHeart />
                    </div>
                    <div className="col-9">
                      <span className="nav-link">Vizite</span>
                    </div>
                  </div>
                </Link>
                <div
                  className={`d-flex justify-content-center flex-column option text-center position-relative 
                    ${isVisitsOpen ? "active" : ""}`}
                >
                  <div
                    className="w-100 position-relative option-content text-center"
                    onClick={() => {
                      handleLinkClick("vizite");
                      handleSetVisitStatus("PENDING");
                    }}
                  >
                    <h2>
                      <span className="ms-5">In asteptare</span>
                    </h2>
                  </div>
                  <div
                    className="w-100 position-relative option-content"
                    onClick={() => {
                      handleLinkClick("vizite");
                      handleSetVisitStatus("APPROVED");
                    }}
                  >
                    <h2>
                      <span className="ms-5">Confirmate</span>
                    </h2>
                  </div>
                  <div
                    className="w-100 position-relative option-content"
                    onClick={() => {
                      handleLinkClick("vizite");
                      handleSetVisitStatus("REJECTED");
                    }}
                  >
                    <h2>
                      <span className="ms-5 text-center">Respinse</span>
                    </h2>
                  </div>
                </div>
              </div>
            </li>
            <li className="d-flex flex-row w-100 p-0 nav-item">
              <div className="m-0 p-0 container ">
                <div
                  className={`row m-0 py-2 link-container position-relative ${
                    activeLink === "/Admin/monitoring" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("/Admin/monitoring")}
                >
                  <div className="col-3 icon">
                    <PiSecurityCameraFill />
                  </div>
                  <div className="col-9">
                    <Link to="/Admin/monitoring" className="nav-link">
                      Monitorizare
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
