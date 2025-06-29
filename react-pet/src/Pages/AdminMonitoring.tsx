import { useEffect, useState } from "react";
import "../Styles/AdminMonitoring.css";
import axios from "axios";
import { set } from "date-fns";

const AdminMonitoring = () => {
  const [value, setValue] = useState("0");
  const [temp, setTemp] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [videoKey, setVideoKey] = useState<number>(Date.now());

  const controlMirror = async () => {
    try {
      await axios.get("http://192.168.0.2/control", {
        baseURL: "http://192.168.0.2",
        params: {
          var: "hmirror",
          val: "1",
        },
      });
    } catch (err) {
      console.error("Eroare flip mirror:", err);
    }
  };

  useEffect(() => {
    setVideoKey(Date.now());
    controlMirror();
    const ws = new WebSocket("ws://192.168.0.2/ws");

    ws.onmessage = (event) => {
      console.log("Mesaj primit de la ESP32:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (typeof data.temperatura === "number") {
          setTemp(data.temperatura);
        }
        if (typeof data.greutate === "number") {
          setWeight(data.greutate);
        }
      } catch (err) {
        console.warn("Mesaj invalid JSON:", event.data);
      }
    };

    ws.onopen = () => {
      console.log("WebSocket conectat");
    };

    ws.onerror = (err) => {
      console.error("Eroare WebSocket:", err);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 mt-4">
      <div className="row w-100 mx-0" style={{ maxWidth: "1200px" }}>
        <div className="col-8 p-5 justify-content-center d-flex flex-column">
          <div
            className="card video-card"
            style={{
              boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.2)",
              borderRadius: "20px",
            }}
          >
            <div className="card-header bg-dark text-white">
              Stream Video Live
            </div>
            <img
              key={videoKey}
              src="http://192.168.0.2:81/stream"
              alt="Live Stream"
              className="img-fluid"
            />
          </div>
        </div>

        <div className="col-lg-4 p-3 d-flex flex-column justify-content-center ">
          <div className="param-card">
            <h2>Temperatură</h2>
            <h2 id="temp-value">
              {temp !== null ? `${temp.toFixed(1)} °C` : "Se încarcă..."}
            </h2>
          </div>

          <div className="param-card">
            <h2>Hrană Rămasă</h2>
            <h2 id="food-value">
              {weight !== null ? `${weight.toFixed(1)} g` : "Se încarcă..."}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMonitoring;
