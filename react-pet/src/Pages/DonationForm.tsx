import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useAuth } from "../Auth";
import "../Styles/DonationForm.css";
import Navbar from "../Components/Navbar/Navbar";

const stripePromise = loadStripe(
  "pk_test_51Rb2rmRxPH9g1qMClgZsPADpqQikZ74toEoCEC1sCKoAmyepFkjQI3JH5SRhucRR89anGzBipHzjVS2YQ5bT4rK200PKRDi0Rf"
);

const DonatieForm = () => {
  const [suma, setSuma] = useState("");
  const [sumaSelectata, setSumaSelectata] = useState<number | null>(null);
  const presetValues = [10, 50, 100, 200, 500];
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePresetClick = (val: number) => {
    setSuma(val.toString());
    setSumaSelectata(val);
  };

  const handleDonate = async () => {
    const sumaNumerica = parseFloat(suma);
    console.log("Suma introdusă:", sumaNumerica);
    if (isNaN(sumaNumerica) || sumaNumerica <= 0) {
      alert("Introdu o sumă validă");
      return;
    }

    setLoading(true);

    try {
      if (!user || !user.email) {
        alert("Eroare: Utilizatorul nu este autentificat.");
      }

      const response = await axios.post(
        "http://localhost:8090/api/donatii/create-checkout",
        {
          userEmail: user?.email,
          amount: sumaNumerica,
        }
      );

      const { url } = response.data;
      const stripe = await stripePromise;

      if (stripe && url) {
        window.location.href = url;
      } else {
        alert("Eroare la redirecționare");
      }
    } catch (error) {
      console.error("Eroare la inițierea plății:", error);
      alert("A apărut o eroare la inițierea plății.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation_container vh-100">
      <Navbar />
      <div className="container mt-4 fs-5 position-absolute top-50 start-50 translate-middle">
        <div
          style={{
            maxWidth: "50%",
            margin: "0 auto",
            padding: "2rem",
          }}
        >
          <h2 className="text-center mb-4 fs-1">Donează pentru adăpost</h2>

          <div className="mb-3 d-flex gap-2 flex-wrap justify-content-center">
            {presetValues.map((val) => (
              <button
                key={val}
                type="button"
                className={
                  val === sumaSelectata
                    ? "btn btn-success fs-3 fw-bold"
                    : "btn btn-outline-success fs-3 fw-bold"
                }
                onClick={() => handlePresetClick(val)}
              >
                {val} RON
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Introduceți suma (RON)"
            value={suma}
            onChange={(e) => setSuma(e.target.value)}
            style={{ padding: "10px", width: "40%", marginBottom: "1rem" }}
            className="ms-auto me-auto d-block rounded-3"
          />
          <button
            onClick={handleDonate}
            disabled={loading}
            style={{ padding: "10px 20px", width: "40%" }}
            className="ms-auto me-auto d-block btn btn-success fs-3"
          >
            {loading ? "Se redirecționează..." : "Donează"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonatieForm;
