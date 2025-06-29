import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../Components/Navbar/Navbar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ro } from "date-fns/locale/ro";
import { useContext, useEffect, useState } from "react";
import "../Styles/VisitForm.css";
import { AuthContext } from "../Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const VisitForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [visitData, setVisitData] = useState({
    phone: "",
    observations: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDateError("");

    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : "";

    try {
      await axios.post(
        "http://localhost:8090/api/appointments",
        {
          phone: visitData.phone,
          observations: visitData.observations,
          appointmentDate: formattedDate,
        },
        { withCredentials: true }
      );
      alert("Programarea a fost trimisă cu succes!");
      console.log("Programarea a fost trimisă cu succes");
      navigate("/MyAccount");
    } catch (error: any) {
      const msg = error.response?.data;
      if (error.response?.status === 409) {
        alert("Ai deja o programare activă");
        navigate("/MyAccount");
      } else if (error.response?.status === 400 && msg) {
        setDateError(msg);
        console.error("Eroare de validare:", msg);
      } else {
        console.error("Eroare la trimiterea programării:", error);
        alert(
          "A apărut o eroare la trimiterea programării. Te rugăm să încerci din nou."
        );
      }
    }
  };

  useEffect(() => {
    console.log("dateError a fost actualizat:", dateError);
  }, [dateError]);

  if (!authContext?.user) {
    return (
      <>
        <div className="visit_container vh-100">
          <Navbar />
          <div className="d-flex justify-content-center align-items-center vh-100 text-center">
            <div>
              <h1 className="mb-5">
                Trebuie să fii autentificat pentru a programa o vizită.
              </h1>
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
  return (
    <>
      <div className="visit_container vh-100">
        <Navbar />
        <div className="container mt-4 fs-5 position-absolute top-50 start-50 translate-middle">
          <h2 className="mb-5 text-center fs-1">
            Programează o vizită la adăpost pentru a cunoaște animăluțele!
          </h2>
          <Form
            className="bg-light p-4 rounded shadow"
            style={{ fontSize: "1.5rem" }}
            onSubmit={handleSubmit}
          >
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Nume și prenume</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${authContext?.user?.lastName} ${authContext?.user?.firstName}`}
                    readOnly
                    className="fs-5"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Număr de telefon</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="07xxxxxxxx"
                    className="fs-5"
                    onChange={(e) =>
                      setVisitData({ ...visitData, phone: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={authContext?.user?.email}
                    className="fs-5"
                    readOnly
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Dată vizitei</Form.Label>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={ro}
                  >
                    <DatePicker
                      label="Selectează o dată"
                      value={selectedDate}
                      onChange={(newDate) => {
                        setSelectedDate(newDate);
                        setDateError("");
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                          InputLabelProps: {
                            sx: { fontFamily: "inherit", fontSize: "1.2rem" },
                          },
                        },
                      }}
                    />
                    {dateError && (
                      <div className="text-danger mt-2 fs-5">{dateError}</div>
                    )}
                  </LocalizationProvider>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Observații suplimentare</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="observations"
                    rows={5}
                    placeholder="Scrie aici orice alte detalii relevante..."
                    className="fs-5"
                    style={{ height: "153px" }}
                    onChange={(e) =>
                      setVisitData({
                        ...visitData,
                        observations: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
            </div>

            <div className="text-center mt-3 ">
              <Button variant="success" type="submit" className="fs-4">
                Trimite programarea
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default VisitForm;
