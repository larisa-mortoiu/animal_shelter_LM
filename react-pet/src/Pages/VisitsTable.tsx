import "../Styles/table.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import totalIcon from "../assets/total.png";
import pendingIcon from "../assets/pending.png";
import approvedIcon from "../assets/approved.png";
import { useSearchParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { AdminOutletContext } from "./AdminPage";

interface VisitAdmin {
  id: number;
  userId: number;
  user: {
    firstName: string;
    lastName: string;
  };
  phone: string;
  observations: string;
  appointmentDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "TOATE";
}

const statusLabels: Record<string, string> = {
  PENDING: "În aşteptare",
  APPROVED: "Confirmată",
  REJECTED: "Respinsă",
};

const messageStatusLabels: Record<string, string> = {
  PENDING: "în aşteptare",
  APPROVED: "confirmate",
  REJECTED: "respinse",
};

const statusVariants: Record<string, string> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "danger",
};

type Overview = {
  [key: string]: number;
};

const VisitsTable = () => {
  const { visitStatus: status } = useOutletContext<AdminOutletContext>();

  const [visits, setVisits] = useState<VisitAdmin[]>([]);
  const [overview, setOverview] = useState<Overview>({});
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchVisits();
  }, [searchParams, status]);

  const fetchVisits = async () => {
    try {
      const response = await axios.get<{
        visitAppointmentList: VisitAdmin[];
        appointmentsCounts: Overview;
      }>(`http://localhost:8090/api/appointments/all/${status}`);
      setVisits(response.data.visitAppointmentList);
      setOverview(response.data.appointmentsCounts);
    } catch (error) {
      showAlert("danger", "Eroare la încărcarea vizitelor");
    }
  };
  const handleStatusChange = (
    id: number,
    newStatus: "APPROVED" | "REJECTED"
  ) => {
    axios
      .patch(`http://localhost:8090/api/appointments/${id}/status`, null, {
        params: { status: newStatus },
        withCredentials: true,
      })
      .then(() => fetchVisits())
      .catch((err) => {
        console.error(`Eroare la actualizarea statusului pentru ${id}:`, err);
        setError("Nu am putut actualiza statusul. Încearcă din nou.");
      });
  };

  return (
    <div className="p-4">
      <h2>Gestionează cererile de vizită</h2>

      <div className="mx-5 p-0 row d-flex justify-content-between">
        <div className="info_card dog_card d-flex col-md-3 flex-row align-items-center ">
          <div className="details ps-3">
            <h2>{overview["APPROVED"] ? overview["APPROVED"] : 0}</h2>
            <p className="fs-4">cereri confirmate</p>
          </div>
          <img src={approvedIcon} alt="approved_icon" />
        </div>
        <div className="info_card cat_card d-flex col-md-3 flex-row align-items-center">
          <div className="details ps-3">
            <h2>{overview["PENDING"] ? overview["PENDING"] : 0}</h2>
            <p className="fs-4">cereri în așteptare</p>
          </div>
          <img src={pendingIcon} alt="pending_icon" />
        </div>
        <div className="info_card animal_card d-flex col-md-3 flex-row align-items-center">
          <div className="details ps-3">
            <h2>{overview["toate"] ? overview["toate"] : 0}</h2>
            <p className="ms-auto fs-4">cereri în total</p>
          </div>
          <img src={totalIcon} alt="total_icon" />
        </div>
      </div>
      {!visits.length ? (
        <p className="p-4 fs-2">
          Nu există cereri {messageStatusLabels[status]} .
        </p>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className="mt-4 fs-5 text-center"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Utilizator</th>
                <th>Telefon</th>
                <th>Dată</th>
                <th>Observații</th>
                <th>Status</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>
                    {v.user.firstName} {v.user.lastName}
                  </td>
                  <td>{v.phone}</td>
                  <td>{v.appointmentDate}</td>
                  <td>{v.observations}</td>
                  <td>
                    <Badge className="fs-5" bg={statusVariants[v.status]}>
                      {statusLabels[v.status]}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="success"
                      className="me-2 fs-5"
                      onClick={() => handleStatusChange(v.id, "APPROVED")}
                      disabled={v.status !== "PENDING"}
                    >
                      Aprobare
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="fs-5"
                      onClick={() => handleStatusChange(v.id, "REJECTED")}
                      disabled={v.status !== "PENDING"}
                    >
                      Respingere
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

function showAlert(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}

export default VisitsTable;
