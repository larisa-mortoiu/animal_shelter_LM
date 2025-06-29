import styles from "../Styles/Login.module.css";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<any>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8090/login",
        new URLSearchParams({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        authContext?.login(response.data);
        navigate("/MyAccount");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="visit_container vh-100">
        <Navbar />
        <div className={styles.hero + "justify-content-center"}>
          <div className={styles.body_login}>
            <div className={styles.wrapper}>
              <form onSubmit={handleSubmit}>
                <h1>Conectează-te</h1>
                <div className={styles.input_box}>
                  <input
                    type="text"
                    value={email}
                    placeholder="Nume de utilizator"
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
                <div className={styles.remember_forgot}>
                  <label>
                    <input type="checkbox"></input> Tine-ma minte
                  </label>
                  <a href="#"> Ai uitat parola?</a>
                </div>

                <button type="submit" className={styles.btn_login}>
                  Conectare
                </button>

                <div className={styles.register_link}>
                  <p>
                    Nu ai cont? <Link to="/Register">Creeaza-ti unul!</Link>
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

export default LoginPage;
