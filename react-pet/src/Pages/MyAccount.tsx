import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth";
import styles from "../Styles/MyAccount.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";
import { Badge, Button } from "react-bootstrap";

interface visitAppointment {
  phone: string;
  appointmentDate: string;
  observations?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const statusLabels: Record<string, string> = {
  PENDING: "În aşteptare",
  APPROVED: "Confirmată",
  REJECTED: "Respinsă",
};
const statusColors: Record<string, string> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "danger",
};

function MyAccount() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [visitAppointment, setVisitAppointment] =
    useState<visitAppointment | null>(null);

  useEffect(() => {
    authContext?.check;
    axios
      .get("http://localhost:8090/api/appointments/user", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setVisitAppointment(response.data);
        }
      })
      .catch((error) => {
        if (error.response?.status === 204) {
          console.log("Nu există programări pentru acest utilizator.");
        } else {
          console.error("Eroare la obținerea programărilor:", error);
        }
      });
  }, []);

  const handleCancel = async () => {
    try {
      await axios.delete("http://localhost:8090/api/appointments/user", {
        withCredentials: true,
      });
      setVisitAppointment(null);
      alert("Programarea a fost anulată cu succes.");
    } catch (error: any) {
      console.error("Eroare la anularea programării:", error);
      alert(
        "A apărut o eroare la anularea programării. Te rugăm să încerci din nou."
      );
    }
  };

  return (
    <>
      <Navbar />
      <body className={styles.body_account}>
        <div className={styles.card + " mt-0"}>
          <div className={styles.left_container}>
            <h2 className={styles.h2_account}>
              Bine ai venit, {authContext?.user?.firstName}!
            </h2>

            <button type="button" className="btn-custom">
              <Link to="/VisitForm">Programează o vizită!</Link>
            </button>
            {authContext?.user == null ? (
              <button
                type="button"
                className="btn-custom"
                onClick={() => {
                  authContext?.logout();
                  navigate("/Login");
                }}
              >
                Conectează-te
              </button>
            ) : (
              <button
                type="button"
                className="btn-custom"
                onClick={() => {
                  authContext?.logout();
                  authContext.setUser(null);
                  navigate("/HomePage");
                }}
              >
                Deconectează-te
              </button>
            )}
          </div>
          <div className={styles.right_container}>
            {/* <div className={styles.box_wrapper}> */}
            <div className={styles.info_box}>
              <h3 className={styles.h3_account}>Datele contului</h3>
              <table className={styles["table-acc"]}>
                <tr>
                  <td>Nume:</td>
                  <td>{authContext?.user?.firstName}</td>
                </tr>
                <tr>
                  <td>Prenume:</td>
                  <td>{authContext?.user?.lastName}</td>
                </tr>
                <tr>
                  <td>E-mail:</td>
                  <td>{authContext?.user?.email}</td>
                </tr>
              </table>
            </div>

            <div className={styles.appointment_box}>
              <h3 className={styles.h3_account}>Vizită programată</h3>
              {visitAppointment ? (
                <table className={styles["table-acc"] + " mt-3"}>
                  <thead>
                    <tr className="fs-3" style={{ textAlign: "center" }}>
                      <th>Data vizitei</th>
                      <th>Nr. telefon</th>
                      <th>Observații</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ textAlign: "center" }}>
                      <td>
                        {new Date(
                          visitAppointment.appointmentDate
                        ).toLocaleDateString("ro-RO")}
                      </td>
                      <td>{visitAppointment.phone}</td>
                      <td>{visitAppointment.observations || "–"}</td>
                      <td>
                        <Badge bg={statusColors[visitAppointment.status]}>
                          {statusLabels[visitAppointment.status]}
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                  <Button
                    variant="danger"
                    className="mt-3"
                    onClick={handleCancel}
                  >
                    Anulează vizita
                  </Button>
                </table>
              ) : (
                <p className="fs-3 text-center mt-5">
                  Nu ai nicio programare activă.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* </div> */}
      </body>
    </>
  );
}

export default MyAccount;
