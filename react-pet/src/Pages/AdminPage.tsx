import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import "../Styles/Admin.css";
import "bootstrap/dist/js/bootstrap";
import { AnimalProvider } from "../ContextAnimal";
import { useState } from "react";

export type VisitStatus = "TOATE" | "PENDING" | "APPROVED" | "REJECTED";

export interface AdminOutletContext {
  visitStatus: VisitStatus;
  handleSetVisitStatus: (status: VisitStatus) => void;
}

const AdminPage = () => {
  const [visitStatus, setVisitStatus] = useState<VisitStatus>("TOATE");

  const handleSetVisitStatus = (status: VisitStatus) => {
    setVisitStatus(status);
  };

  return (
    <AnimalProvider>
      <div className="container-fluid admin_container h-100 m-0 p-0">
        <div className="d-flex w-auto h-100">
          <Sidebar
            visitStatus={visitStatus}
            handleSetVisitStatus={handleSetVisitStatus}
          />
          <div className="container-fluid d-flex flex-column h-100">
            <div className="d-flex h-50 pt-5 flex-column">
              <Outlet
                context={
                  {
                    visitStatus,
                    // handleSetVisitStatus,
                  } as AdminOutletContext
                }
              />
            </div>
          </div>
        </div>
      </div>
    </AnimalProvider>
  );
};

export default AdminPage;
