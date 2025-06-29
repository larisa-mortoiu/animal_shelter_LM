import styles from "../Styles/Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";
import { User } from "../Types";
import Navbar from "../Components/Navbar/Navbar";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const newUser: User = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: "USER",
    };

    setUser(newUser);

    try {
      const response = await fetch("http://localhost:8090/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("Cont creat cu succes");
        navigate("/RegisterConfirm");
      } else {
        console.error("Crearea contului a eșuat");
      }
    } catch (error) {
      console.error("Eroare la crearea contului:", error);
    }
  };

  return (
    <>
      <div className="visit_container vh-100">
        <Navbar />
        <div className={styles.hero}>
          <div className={styles.body_login}>
            <div className={styles.wrapper}>
              <form onSubmit={handleSubmit}>
                <h1>Creează un cont</h1>
                <div className={styles.input_box}>
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Nume"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  ></input>
                  <i className="bx bxs-user-circle"></i>
                </div>
                <div className={styles.input_box}>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Prenume"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  ></input>
                  <i className="bx bxs-user-circle"></i>
                </div>
                <div className={styles.input_box}>
                  <input
                    type="text"
                    value={email}
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></input>
                  <i className="bx bxs-user-circle"></i>
                </div>
                <div className={styles.input_box}>
                  <input
                    type="password"
                    value={password}
                    placeholder="Parola"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></input>
                  <i className="bx bxs-lock-alt"></i>
                </div>

                <button type="submit" className={styles.btn_login}>
                  Înregistrare
                </button>

                <div className={styles.register_link}>
                  <p>
                    Ai deja cont? <Link to="/Login">Conectează-te!</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
