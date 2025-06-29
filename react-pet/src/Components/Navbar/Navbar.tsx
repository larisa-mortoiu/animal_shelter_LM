import "./Navbar.css";
import logo from "../../assets/paw.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth";
import { useContext } from "react";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className="navbari px-5">
      <img src={logo} alt="" className="logo" />
      <ul>
        {authContext?.user?.role === "ADMIN" && (
          <li id="my-account">
            <button
              className="btn-custom"
              style={{ width: "auto", padding: "5px 20px" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/Admin");
              }}
            >
              <a href="" onClick={(e) => e.preventDefault()}>
                Admin
              </a>
            </button>
          </li>
        )}
        <li>
          <Link className={"link-style"} to="/HomePage">
            Acasa
          </Link>
        </li>
        <li>
          <Link to="/Servicii">Servicii</Link>
        </li>
        <li>
          <Link to="/Adopt">Animale</Link>
        </li>
        <li>
          <Link to="/VisitForm">Vizite</Link>
        </li>
        <li>
          <Link to="/Donation">Donații</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
        <li id="my-account">
          {authContext?.user == null ? (
            <button
              className="btn-custom"
              onClick={() => {
                navigate("/Login");
              }}
            >
              <a href="">Conectare</a>
            </button>
          ) : (
            <button
              className="btn-custom"
              onClick={() => {
                navigate("/MyAccount");
              }}
            >
              <a href="">Contul meu</a>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
