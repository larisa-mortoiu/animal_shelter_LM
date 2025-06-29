import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Styles/RegisterConfirm.module.css";
import Navbar from "../Components/Navbar/Navbar";
import { Button } from "react-bootstrap";

function RegisterConfirm() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext?.check;
  });

  const navigate = useNavigate();
  return (
    <>
      <div className="visit_container vh-100">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center vh-100 text-center">
          <div>
            <h1 className="mb-5">Contul a fost creat cu succes!</h1>
            <Button
              variant="success"
              onClick={() => navigate("/login")}
              className="fs-2 mt-4"
            >
              Mergi la autentificare
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterConfirm;
